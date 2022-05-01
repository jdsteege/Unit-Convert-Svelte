<script>
  export let scaleList;
  export let value;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<ion-select
  style="color:#3171e0"
  placeholder="Scale"
  {value}
  interface="popover"
  on:ionChange={(event) => {
    value = event.target.value;
    dispatch("scaleChange", {});
  }}
>
  {#each scaleList as { id, pluralLabel, abbreviation }}
    <ion-select-option value={id}
      >{pluralLabel + ` (` + abbreviation + `)`}</ion-select-option
    >
  {/each}
</ion-select>
