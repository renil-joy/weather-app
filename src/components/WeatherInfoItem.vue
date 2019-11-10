<template>
  <ion-card v-if="weatherresult">
    <ion-card-header>
      <ion-card-title>{{new Date(weatherresult.time*1000).toLocaleDateString()}}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item>
          <ion-label>
            <strong>Summary:</strong>
            {{weatherresult.summary}}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <strong>High Temp:</strong>
            {{weatherresult.temperatureHigh}}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <strong>High Temp Time:</strong>
            {{new Date(weatherresult.temperatureHighTime*1000).toLocaleTimeString()}}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <strong>Low Temp:</strong>
           {{weatherresult.temperatureLow}}
          </ion-label>
        </ion-item>
          <ion-item>
          <ion-label>
            <strong>Temp Time:</strong>
           {{new Date(weatherresult.temperatureLowTime*1000).toLocaleTimeString()}}
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>    
  </ion-card>
</template>

<script>
export default {
  name: "WeatherInfoItem",
  props: ["weatherresult"]
};
</script>