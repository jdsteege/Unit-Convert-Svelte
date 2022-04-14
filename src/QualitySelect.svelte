<script>
  export let qualityList;
  export let currentQuality;

  $: console.log("cq1 is " + currentQuality);
</script>

<h2>QualitySelect</h2>

<ion-segment
  value={currentQuality}
  on:ionChange={(event) => {
    currentQuality = event.detail.value;
  }}
>
  {#each qualityList as { id, label }, i}
    <ion-segment-button value={id}>
      <ion-label>{label}</ion-label>
    </ion-segment-button>
  {/each}
</ion-segment>
