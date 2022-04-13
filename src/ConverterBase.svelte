<script>
  import QualitySelect from "./QualitySelect.svelte";
  import ScaleSelect from "./ScaleSelect.svelte";

  import unitData from "./unit-data.json";

  let qualityList = unitData.map((q) => ({ id: q.id, label: q.label }));
</script>

<h1>ConverterBase1</h1>

<ion-content>
  <ion-grid>
    <ion-row>
      <ion-col size="1" />
      <ion-col>
        <QualitySelect {qualityList} />
        <ScaleSelect />
      </ion-col>
      <ion-col size="1" />
    </ion-row>
  </ion-grid>
</ion-content>
