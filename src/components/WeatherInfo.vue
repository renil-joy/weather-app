<template>
  <div>
    <div  v-for="weatherResult in weatherResults" v-bind:key="weatherResult.time">
      <WeatherInfoItem v-if="weatherResults" v-bind:weatherResult="weatherResult" />
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
  props: ["weatherResults"]
};
</script>