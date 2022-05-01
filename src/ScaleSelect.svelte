<script>
  export let scaleList;
  export let value;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<ion-select
  placeholder="Scale"
  {value}
  interface="popover"
  on:ionChange={(event) => {
    value = event.target.value;
    dispatch("scaleChange", {});
  }}
>
  {#each scaleList as { id, pluralLabel }}
    <ion-select-option value={id}>{pluralLabel}</ion-select-option>
  {/each}
</ion-select>
