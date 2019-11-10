<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title size="large" align="center">WeatherInfo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <WeatherSearch v-on:get-city="getCityDetails" />
      <WeatherInfo v-bind:weatherresults="weatherresults" />
    </ion-content>
  </div>
</template>

<script>
import WeatherSearch from "../components/WeatherSearch";
import WeatherInfo from "../components/WeatherInfo";
import axios from "axios";

export default {
  name: "home",
  components: {
    WeatherSearch,
    WeatherInfo
  },
  data() {
    return {
      latitude: "",
      longitude: "",
      weatherresults: {
        type: Array,
        default: () => []
      }
    };
  },
  methods: {
    getCityDetails(city) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${city},
           &key=${process.env.VUE_APP_GEOCODE_API_CODE}`
        )
        .then(res => {
          if (res.status === 200 && res.data.status === "OK") {
            console.log(res.data.status);

            this.latitude = res.data.results[0].geometry.location.lat;
            this.longitude = res.data.results[0].geometry.location.lng;
            this.getWeatherDetailsByCoordinates(city.toUpperCase());
          } else {
            this.showAlert("Please enter a valid city name");
          }
        })
        .catch(err => this.showAlert(err.message));
    },

    getWeatherDetailsByCoordinates(city) {
      //If result of same city in localstorage, dont call API
      this.weatherresults = null;
      if (localStorage.getItem(city)) {
        try {
          this.weatherresults = JSON.parse(localStorage.getItem(city));
        } catch (e) {
          localStorage.removeItem(city);
        }
      }
      if (null == this.weatherresults) {
        console.log("Not in local storage");
        axios
          .get(
            `https://api.darksky.net/forecast/${process.env.VUE_APP_DARKSKY_API_CODE}/${this.latitude},${this.longitude}?exclude=minutely,hourly,flags`
          )
          .then(res => {
            if (res.status === 200) {
              this.weatherresults = res.data.daily.data;

              const parsedResult = JSON.stringify(this.weatherresults);
              localStorage.setItem(city, parsedResult);
              console.log(city);
            }
          })
          .catch(err => this.showAlert(err.message));
      }
    },
    showAlert(msg) {
      return this.$ionic.alertController
        .create({
          header: "Enter City Name",
          message: msg,
          buttons: ["OK"]
        })
        .then(a => a.present());
    }
  },
  created() {
    console.log("OK");
    if ("geolocation" in navigator) {
      console.log("Geolocation is  available.");
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;

        this.getWeatherDetailsByCoordinates("CURRENTCITY");
      },
      err => {
        console.log(err.message);
      }
    );
  }
};
</script>
