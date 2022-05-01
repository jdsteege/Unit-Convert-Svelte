<script>
  export let qualityList;
  export let currentQualityId;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<ion-select
  style="color:#5260ff"
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
