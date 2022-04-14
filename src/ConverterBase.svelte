<script>
  import QualitySelect from "./QualitySelect.svelte";
  import ScaleSelect from "./ScaleSelect.svelte";

  import unitData from "./unit-data.json";

  let qualityList = unitData.map((q) => ({ id: q.id, label: q.label }));
  let currentQuality = "mass";

  $: console.log("cq2 is " + currentQuality);
</script>

<h1>ConverterBase1</h1>

currentQuality is {currentQuality}

<ion-content>
  <ion-grid>
    <ion-row>
      <ion-col size="1" />
      <ion-col>
        <QualitySelect {qualityList} bind:currentQuality />
        <ScaleSelect />
      </ion-col>
      <ion-col size="1" />
    </ion-row>
  </ion-grid>
</ion-content>
