<script>
  export let value;
</script>

<ion-input
  type="number"
  placeholder="1"
  {value}
  on:ionChange={(event) => {
    value = event.target.value;
  }}
/>
