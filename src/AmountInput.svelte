<script>
  export let value = undefined;

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<ion-input
  inputmode="decimal"
  maxlength="12"
  enterkeyhint="done"
  placeholder="Amount"
  {value}
  on:ionInput={(event) => {
    value = event.target.value;
    dispatch("amountChange", {});
  }}
/>
