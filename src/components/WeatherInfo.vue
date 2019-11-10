<template>
  <div>
    <div  v-for="weatherresult in weatherresults" v-bind:key="weatherresult.time">
      <WeatherInfoItem v-if="weatherresults" v-bind:weatherresult="weatherresult" />
    </div>
  </div>
</template>

<script>
import WeatherInfoItem from "../components/WeatherInfoItem";
export default {
  name: "WeatherInfo",
  components: {
    WeatherInfoItem
  },
  props: ["weatherresults"]
};
</script>