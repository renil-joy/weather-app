<template>
  <ion-card v-if="weatherResult">
    <ion-card-header>
      <ion-card-title>{{new Date(weatherResult.time*1000).toLocaleDateString()}}</ion-card-title>
      <skycon :condition="weatherResult.icon" />
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item>
          <ion-label>
            <strong>Summary:</strong>
            {{weatherResult.summary}}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <strong>High Temp:</strong>
            {{weatherResult.temperatureHigh}}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <strong>High Temp Time:</strong>
            {{new Date(weatherResult.temperatureHighTime*1000).toLocaleTimeString()}}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <strong>Low Temp:</strong>
            {{weatherResult.temperatureLow}}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <strong>Low Temp Time:</strong>
            {{new Date(weatherResult.temperatureLowTime*1000).toLocaleTimeString()}}
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script>
export default {
  name: "WeatherInfoItem",
  props: ["weatherResult"]
};
</script>