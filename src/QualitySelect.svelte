<script>
  export let qualityList;
  export let currentQualityId;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<!-- <ion-segment
  value={currentQualityId}
  on:ionChange={(event) => {
    currentQualityId = event.target.value;
  }}
>
  {#each qualityList as { id, label }}
    <ion-segment-button value={id}>
      <ion-label>{label}</ion-label>
    </ion-segment-button>
  {/each}
</ion-segment> -->

<ion-select
  value={currentQualityId}
  interface="popover"
  on:ionChange={(event) => {
    currentQualityId = event.target.value;
    dispatch("qualityChange", {});
  }}
>
  {#each qualityList as { id, label }}
    <ion-select-option value={id}>{label}</ion-select-option>
  {/each}
</ion-select>
