<script>
  export let value;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<ion-input
  inputmode="decimal"
  maxlength="12"
  enterkeyhint="done"
  {value}
  on:ionInput={(event) => {
    value = event.target.value;
    dispatch("amountChange", {});
  }}
/>
