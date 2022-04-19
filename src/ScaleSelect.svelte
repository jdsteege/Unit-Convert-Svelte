<script>
  export let scaleList;
  export let value;
</script>

<ion-select
  placeholder="Scale"
  {value}
  interface="popover"
  on:ionChange={(event) => {
    value = event.target.value;
  }}
>
  {#each scaleList as { id, pluralLabel }}
    <ion-select-option value={id}>{pluralLabel}</ion-select-option>
  {/each}
</ion-select>
