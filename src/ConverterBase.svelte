<script>
  //
  // Fixes issues with floating point arithmetic.
  import BigNumber from "bignumber.js";
  //
  import AmountInput from "./AmountInput.svelte";
  import QualitySelect from "./QualitySelect.svelte";
  import ScaleSelect from "./ScaleSelect.svelte";
  //
  import unitData from "../public/unit-data.json";

  //
  let qualityList = unitData.map((q) => ({ id: q.id, label: q.label }));
  let currentQualityId = localStorage.getItem("currentQualityId") ?? `volume`;
  let scaleList;
  //
  let currentScaleId1 = localStorage.getItem("currentScaleId1");
  let scaleAbbreviation1;
  let conversionFactor1 = new BigNumber(1);
  let amount1;
  //
  let currentScaleId2 = localStorage.getItem("currentScaleId2");
  let scaleAbbreviation2;
  let conversionFactor2 = new BigNumber(1);
  let amount2;
  //
  let spacerSize = 1;

  //
  qualityChanged();
  scale1Changed();
  scale2Changed();

  //
  function saveStorage() {
    localStorage.setItem("currentQualityId", currentQualityId);
    localStorage.setItem("currentScaleId1", currentScaleId1);
    localStorage.setItem("currentScaleId2", currentScaleId2);
  }

  // When quality changes
  function qualityChanged() {
    // if (currentQualityId) {
    for (let q of unitData) {
      if (q.id === currentQualityId) {
        scaleList = q.scales;

        // Search for current scales in scale list. If not found, set to base.
        if (!scaleList.find((s) => s.id === currentScaleId1)) {
          currentScaleId1 = q.primaryScaleId;
          scale1Changed();
        }
        if (!scaleList.find((s) => s.id === currentScaleId2)) {
          currentScaleId2 = q.secondaryScaleId;
          scale2Changed();
        }
        break;
      }
    }

    amount1 = "";
    amount2 = "";
    saveStorage();
    // }
  }

  // When scale 1 changes
  function scale1Changed() {
    // if (currentScaleId1) {
    for (let s of scaleList) {
      if (s.id === currentScaleId1) {
        scaleAbbreviation1 = s.abbreviation;
        conversionFactor1 = new BigNumber(s.conversionFactor);
        break;
      }
    }

    recalculate1();
    saveStorage();
    // }
  }

  // When scale 2 changes
  function scale2Changed() {
    // if (currentScaleId2) {
    for (let s of scaleList) {
      if (s.id === currentScaleId2) {
        scaleAbbreviation2 = s.abbreviation;
        conversionFactor2 = new BigNumber(s.conversionFactor);
        break;
      }
    }

    recalculate2();
    saveStorage();
    // }
  }

  function recalculate1() {
    let temp2 = new BigNumber(amount2);
    if (temp2.isNaN()) {
      amount1 = ``;
      return;
    }

    if (currentQualityId === `temperature`) {
      amount1 = calculateTemperature(currentScaleId2, currentScaleId1, temp2);
      return;
    }

    let temp1 = temp2.times(conversionFactor2).div(conversionFactor1);
    amount1 = temp1.toString().substring(0, 12);
  }

  function recalculate2() {
    let temp1 = new BigNumber(amount1);
    if (temp1.isNaN()) {
      amount2 = ``;
      return;
    }

    if (currentQualityId === `temperature`) {
      amount2 = calculateTemperature(currentScaleId1, currentScaleId2, temp1);
      return;
    }

    let temp2 = temp1.times(conversionFactor1).div(conversionFactor2);
    amount2 = temp2.toString().substring(0, 12);
  }

  function calculateTemperature(fromScaleId, toScaleId, fromAmount) {
    if (fromScaleId === toScaleId) {
      return fromAmount.toString();
    }

    // Convert from first scale to celsius
    let celsius = new BigNumber(fromAmount);
    if (fromScaleId === `fahrenheit`) {
      celsius = fromAmount.minus(32).times(5).div(9);
    }
    if (fromScaleId === `kelvin`) {
      celsius = fromAmount.minus(273.15);
    }

    // Then convert from celsius to second scale
    let toAmount = new BigNumber(celsius);
    if (toScaleId === `fahrenheit`) {
      toAmount = celsius.times(1.8).plus(32);
    }
    if (toScaleId === `kelvin`) {
      toAmount = celsius.plus(273.15);
    }

    return toAmount.toString().substring(0, 7);
  }
</script>

<ion-content>
  <ion-grid fixed>
    <ion-row>
      <ion-col size={spacerSize} />
      <ion-col>
        <QualitySelect
          {qualityList}
          bind:currentQualityId
          on:qualityChange={qualityChanged}
        />
      </ion-col>
      <ion-col size={spacerSize} />
    </ion-row>
    <ion-row>
      <ion-col />
    </ion-row>
    <ion-row>
      <ion-col size={spacerSize} />
      <ion-col>
        <ScaleSelect
          {scaleList}
          bind:value={currentScaleId1}
          on:scaleChange={scale1Changed}
        />
      </ion-col>
      <ion-col size={spacerSize} />
    </ion-row>
    <ion-row>
      <ion-col size={spacerSize} />
      <ion-col>
        <ion-item class="filled">
          <AmountInput bind:value={amount1} on:amountChange={recalculate2} />
          <ion-text>{scaleAbbreviation1}</ion-text>
        </ion-item>
      </ion-col>
      <ion-col size={spacerSize} />
    </ion-row>
    <ion-row>
      <ion-col>
        <h4 style="text-align:center;">=</h4>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col size={spacerSize} />
      <ion-col>
        <ScaleSelect
          {scaleList}
          bind:value={currentScaleId2}
          on:scaleChange={scale2Changed}
        />
      </ion-col>
      <ion-col size={spacerSize} />
    </ion-row>
    <ion-row>
      <ion-col size={spacerSize} />
      <ion-col>
        <ion-item class="filled">
          <AmountInput bind:value={amount2} on:amountChange={recalculate1} />
          <ion-text>{scaleAbbreviation2}</ion-text>
        </ion-item>
      </ion-col>
      <ion-col size={spacerSize} />
    </ion-row>
  </ion-grid>

  <!-- <p>
    currentQualityId is {currentQualityId}<br />
    currentScaleId1 is {currentScaleId1}<br />
    scaleAbbreviation1 is {scaleAbbreviation1}<br />
    amount1 is {amount1}<br />
    currentScaleId2 is {currentScaleId2}<br />
    scaleAbbreviation2 is {scaleAbbreviation2}<br />
    amount2 is {amount2}
  </p> -->

  <!-- {@debug currentQualityId, currentScaleId1, currentScaleId2} -->
</ion-content>
