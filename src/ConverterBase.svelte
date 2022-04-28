<script>
  //
  // Avoids issues with floating point arithmetic.
  import BigNumber from "bignumber.js";
  //
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
  let conversionFactor1 = new BigNumber(1);
  let amount1 = `1`;
  //
  let currentScaleId2;
  let scaleAbbreviation2;
  let conversionFactor2 = new BigNumber(1);
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
          conversionFactor1 = new BigNumber(s.conversionFactor);
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
          conversionFactor2 = new BigNumber(s.conversionFactor);
          break;
        }
      }
    }
    recalculate2();
  }

  function recalculate1() {
    let temp2 = new BigNumber(amount2);
    if (temp2.isNaN()) {
      amount1 = ``;
      return;
    }

    let temp1 = temp2.times(conversionFactor2).div(conversionFactor1);
    amount1 = temp1.toString();
  }

  function recalculate2() {
    let temp1 = new BigNumber(amount1);
    if (temp1.isNaN()) {
      amount2 = ``;
      return;
    }

    let temp2 = temp1.times(conversionFactor1).div(conversionFactor2);
    amount2 = temp2.toString();
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
      <ion-col size="4" />
      <ion-col>
        <ScaleSelect {scaleList} bind:value={currentScaleId1} />
      </ion-col>
      <ion-col size="4" />
    </ion-row>
    <ion-row>
      <ion-col size="4" />
      <ion-col>
        <ion-item class="filled">
          <AmountInput bind:value={amount1} on:amountChange={recalculate2} />
          <ion-text>{scaleAbbreviation1}</ion-text>
        </ion-item>
      </ion-col>
      <ion-col size="4" />
    </ion-row>
    <ion-row>
      <ion-col>
        <h4 style="text-align:center;">=</h4>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size="4" />
      <ion-col>
        <ScaleSelect {scaleList} bind:value={currentScaleId2} />
      </ion-col>
      <ion-col size="4" />
    </ion-row>
    <ion-row>
      <ion-col size="4" />
      <ion-col>
        <ion-item class="filled">
          <AmountInput bind:value={amount2} on:amountChange={recalculate1} />
          <ion-text>{scaleAbbreviation2}</ion-text>
        </ion-item>
      </ion-col>
      <ion-col size="4" />
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
