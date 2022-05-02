'use strict';

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'unit-convert-cache-v01';

// Add list of files to cache here.
const FILES_TO_CACHE = [
    '/', '/index.html', '/build/bundle.js', '/global.css', '/build/bundle.css', '/manifest.json', '/icon-144x144.png', '/favicon.png',
];

// const FILES_TO_CACHE = [
//     '/', '/manifest.json', '/index.html', '/build/bundle.js', '/build/bundle.js.map', '/favicon.ico', '/favicon.png', '/global.css', '/build/bundle.css', '/icon-144x144.png',
//     '/unit-data.json',
// ];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');

    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    // console.log(event);

    if (event.request.url.includes("livereload")) {
        return;
    }

    // TODO: Try to fetch from network first, then fallback on cached files.
    const response =
        caches.match(event.request).then(function (resp) {
            return resp || fetch(event.request);
        }).catch(function (err) {
            console.error('[ServiceWorker] Fetch error for url ' + event.request.url + ': ' + err);
            return false;
        });

    // console.log(event.request.url);
    // console.log(response);

    event.respondWith(response);

});