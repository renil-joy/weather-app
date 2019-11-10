<template>
  <ion-card v-if="weatherresult">
    <ion-card-header>
      <ion-card-title>{{new Date(weatherresult.time*1000).toLocaleDateString()}}</ion-card-title>
      <ion-col>
        <ion-item>
          <ion-label>Summary:</ion-label>
          <ion-card-subtitle>{{weatherresult.summary}}</ion-card-subtitle>
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item>
          <ion-label>High Temp:</ion-label>
          <ion-card-subtitle>{{weatherresult.temperatureHigh}}</ion-card-subtitle>
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item>
          <ion-label>High Temp Time:</ion-label>
          <ion-card-subtitle>{{new Date(weatherresult.temperatureHighTime*1000).toLocaleTimeString()}}</ion-card-subtitle>
        </ion-item>
      </ion-col>
       <ion-col>
        <ion-item>
          <ion-label>Low Temp:</ion-label>
          <ion-card-subtitle>{{weatherresult.temperatureLow}}</ion-card-subtitle>
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item>
          <ion-label>Low Temp Time:</ion-label>
          <ion-card-subtitle>{{new Date(weatherresult.temperatureLowTime*1000).toLocaleTimeString()}}</ion-card-subtitle>
        </ion-item>
      </ion-col>
    </ion-card-header>
  </ion-card>
</template>

<script>
export default {
  name: "WeatherInfoItem",
  props: ["weatherresult"]
};
</script>