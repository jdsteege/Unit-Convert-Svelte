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
  let amount1 = 1;
  //
  let currentScaleId2;
  let scaleAbbreviation2;
  let conversionFactor2 = 1;
  let amount2;

  // When quality changes
  $: {
    if (currentQualityId) {
      for (let q of unitData) {
        if (q.id === currentQualityId) {
          scaleList = q.scales;
          currentScaleId1 = q.baseScaleId;
          currentScaleId2 = q.baseScaleId;
          break;
        }
      }
      recalculate2();
    }
  }

  // When scale 1 changes
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
    recalculate1();
  }
  // When scale 2 changes
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
    recalculate2();
  }

  function recalculate1() {
    // amount1 = (amount2 * conversionFactor2) / conversionFactor1;
  }

  function recalculate2() {
    amount2 = (amount1 * conversionFactor1) / conversionFactor2;
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
          <AmountInput bind:value={amount1} on:amountChange={recalculate2} />
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
          <AmountInput bind:value={amount2} on:amountChange={recalculate1} />
          <ion-text>{scaleAbbreviation2}</ion-text>
        </ion-item>
      </ion-col>
      <ion-col size="2" />
    </ion-row>
  </ion-grid>

  <p>
    currentQualityId is {currentQualityId}<br />
    currentScaleId1 is {currentScaleId1}<br />
    scaleAbbreviation1 is {scaleAbbreviation1}<br />
    amount1 is {amount1}<br />
    currentScaleId2 is {currentScaleId2}<br />
    scaleAbbreviation2 is {scaleAbbreviation2}<br />
    amount2 is {amount2}
  </p>
</ion-content>

<style>
  .filled {
    background-color: #f00;
    color: #0f0;
  }
</style>
