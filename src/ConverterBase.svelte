<script>
  import QualitySelect from "./QualitySelect.svelte";
  import ScaleSelect from "./ScaleSelect.svelte";
  //
  import unitData from "./unit-data.json";

  //
  let qualityList = unitData.map((q) => ({ id: q.id, label: q.label }));
  let currentQualityId = "mass";
  let scaleList;
  let currentScaleId;

  //
  $: {
    for (let q of unitData) {
      if (q.id === currentQualityId) {
        scaleList = q.scales;
        currentScaleId = q.baseScaleId;
      }
    }
  }
</script>

<p>currentQualityId is {currentQualityId}</p>
<p>currentScaleId is {currentScaleId}</p>

<ion-content>
  <ion-grid>
    <ion-row>
      <ion-col size="1" />
      <ion-col>
        <QualitySelect {qualityList} bind:currentQualityId />
      </ion-col>
      <ion-col size="1" />
    </ion-row>
    <ion-row>
      <ion-col size="6" />
      <ion-col>
        <ScaleSelect {scaleList} bind:currentScaleId />
      </ion-col>
      <ion-col size="2" />
    </ion-row>
  </ion-grid>
</ion-content>
