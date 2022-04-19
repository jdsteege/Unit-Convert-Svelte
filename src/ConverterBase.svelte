<script>
  import AmountInput from "./AmountInput.svelte";

  import QualitySelect from "./QualitySelect.svelte";
  import ScaleSelect from "./ScaleSelect.svelte";
  //
  import unitData from "./unit-data.json";

  //
  let qualityList = unitData.map((q) => ({ id: q.id, label: q.label }));
  let currentQualityId = "mass";
  let scaleList;
  //
  let currentScaleId1;
  let scaleAbbreviation1;
  let conversionFactor1 = 1;
  let amountRaw1;
  //
  let currentScaleId2;
  let scaleAbbreviation2;
  let conversionFactor2 = 1;
  let amountRaw2;

  //
  $: {
    for (let q of unitData) {
      if (q.id === currentQualityId) {
        scaleList = q.scales;
        currentScaleId1 = q.baseScaleId;
        currentScaleId2 = q.baseScaleId;
        break;
      }
    }
  }

  //
  $: {
    if (currentScaleId1) {
      for (let s of scaleList) {
        if (s.id === currentScaleId1) {
          scaleAbbreviation1 = s.abbreviation;
          conversionFactor1 = s.conversionFactor;
          break;
        }
      }
    }
  }
  //
  $: {
    if (currentScaleId2) {
      for (let s of scaleList) {
        if (s.id === currentScaleId2) {
          scaleAbbreviation2 = s.abbreviation;
          conversionFactor2 = s.conversionFactor;
          break;
        }
      }
    }
  }

  function recalculate1() {}
  function recalculate2() {}

  $: {
    amountRaw2 = amountRaw1 * 2;
  }
</script>

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
      <ion-col size="2" />
      <ion-col>
        <ScaleSelect {scaleList} bind:value={currentScaleId1} />
      </ion-col>
      <ion-col>
        <ion-item class="filled">
          <AmountInput bind:value={amountRaw1} />
          <ion-text>{scaleAbbreviation1}</ion-text>
        </ion-item>
      </ion-col>
      <ion-col size="2" />
    </ion-row>
    <ion-row>
      <ion-col size="2" />
      <ion-col>
        <ScaleSelect {scaleList} bind:value={currentScaleId2} />
      </ion-col>
      <ion-col>
        <ion-item class="filled">
          <AmountInput bind:value={amountRaw2} />
          <ion-text>{scaleAbbreviation2}</ion-text>
        </ion-item>
      </ion-col>
      <ion-col size="2" />
    </ion-row>
  </ion-grid>

  <p>currentQualityId is {currentQualityId}</p>
  <p>currentScaleId1 is {currentScaleId1}</p>
  <p>scaleAbbreviation1 is {scaleAbbreviation1}</p>
  <p>amountRaw1 is {amountRaw1}</p>
  <p>currentScaleId2 is {currentScaleId2}</p>
  <p>scaleAbbreviation2 is {scaleAbbreviation2}</p>
  <p>amountRaw2 is {amountRaw2}</p>
</ion-content>

<style>
  .filled {
    background-color: #f00;
    color: #0f0;
  }
</style>
