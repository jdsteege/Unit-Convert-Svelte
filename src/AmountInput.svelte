<script>
  export let value;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<ion-input
  inputmode="decimal"
  maxlength="12"
  {value}
  on:ionChange={(event) => {
    value = event.target.value;
    dispatch("amountChange", {});
  }}
/>
