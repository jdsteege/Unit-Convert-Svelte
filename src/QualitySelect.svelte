<script>
  export let qualityList;
  // export let currentQuality;
</script>

<h2>QualitySelect</h2>

<ion-segment>
  {#each qualityList as { id, label }, i}
    <ion-segment-button>
      <ion-label>{label}</ion-label>
    </ion-segment-button>
  {/each}
</ion-segment>
