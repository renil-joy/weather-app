<template>
  <ion-card v-if="weatherResultHourly">
    <ion-card-header>
      <ion-card-title>{{new Date(weatherResultHourly.time*1000).toLocaleString()}}</ion-card-title>
      <skycon :condition="weatherResultHourly.icon"/>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item>
          <ion-label>
            <strong>Summary:</strong>
            {{weatherResultHourly.summary}}
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <strong>High Temp:</strong>
            {{weatherResultHourly.temperature}}
          </ion-label>
        </ion-item>    
      </ion-list>
    </ion-card-content>    
  </ion-card>
</template>

<script>
export default {
  name: "WeatherInfoHourlyItem",
  props: ["weatherResultHourly"]
};
</script>