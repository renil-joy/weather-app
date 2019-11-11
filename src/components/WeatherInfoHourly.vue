<template>
  <div>
    <div v-for="weatherResultHourly in weatherResultsHourly" v-bind:key="weatherResultHourly.time">
      <WeatherInfoHourlyItem
        v-if="weatherResultsHourly"
        v-bind:weatherResultHourly="weatherResultHourly"
      />
    </div>
  </div>
</template>

<script>
import WeatherInfoHourlyItem from "../components/WeatherInfoHourlyItem";
export default {
  name: "WeatherInfoHourly",
  components: {
    WeatherInfoHourlyItem
  },
  props: ["weatherResultsHourly"]
};
</script>