<script>
  export let scaleList;
  export let currentScaleId;

  console.log(scaleList);
</script>

<ion-select
  placeholder="Scale"
  value={currentScaleId}
  interface="popover"
  on:ionChange={(event) => {
    currentScaleId = event.target.value;
  }}
>
  {#each scaleList as { id, pluralLabel }}
    <ion-select-option value={id}>{pluralLabel}</ion-select-option>
  {/each}
</ion-select>
