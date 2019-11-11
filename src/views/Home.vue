<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title size="large" align="center">WeatherInfo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <OnlineIndicator />
      <ion-col>
        <ion-item>
          <AddFavourite v-on:add-favourite="addToFavourites" />
          <ViewFavourite v-on:view-favourite="viewFavourites" />
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-item>
          <FavouriteItem v-bind:favourites="viewCities" />
        </ion-item>
      </ion-col>
      <WeatherSearch v-on:get-city="getCityDetails" />
      <WeatherInfo v-bind:weatherResults="weatherResults" />
      <WeatherInfoHourly v-bind:weatherResultsHourly="weatherResultsHourly" />
    </ion-content>
  </div>
</template>

<script>
import WeatherSearch from "../components/WeatherSearch";
import WeatherInfo from "../components/WeatherInfo";
import WeatherInfoHourly from "../components/WeatherInfoHourly";
import OnlineIndicator from "../components/OnlineIndicator";
import AddFavourite from "../components/AddFavourite";
import ViewFavourite from "../components/ViewFavourite";
import FavouriteItem from "../components/FavouriteItem";
import axios from "axios";

const FAV_CITIES_LIST = "FAV_CITIES_LIST";

export default {
  name: "home",
  components: {
    WeatherSearch,
    WeatherInfo,
    WeatherInfoHourly,
    OnlineIndicator,
    AddFavourite,
    ViewFavourite,
    FavouriteItem
  },
  data() {
    return {
      latitude: "",
      longitude: "",
      searchCity: "",
      searchByHourly: false,
      filter: "",
      weatherResults: [],
      weatherResultsHourly: [],
      favouriteCities: [],
      viewCities: []
    };
  },
  methods: {
    getCityDetails(city, hourly) {
      this.searchCity = city;
      this.searchByHourly = hourly;
      this.viewCities = [];

      console.log(this.searchByHourly);

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
      if (!this.searchByHourly && localStorage.getItem(city)) {
        this.weatherResults = null;
        try {
          this.weatherResults = JSON.parse(localStorage.getItem(city));
        } catch (e) {
          localStorage.removeItem(city);
        }
      }
      if (null == this.weatherResults || this.searchByHourly) {
        console.log("Not in local storage");

        if (this.searchByHourly) this.filter = "minutely,flags";
        else this.filter = "minutely,hourly,flags";

        axios
          .get(
            `https://api.darksky.net/forecast/${process.env.VUE_APP_DARKSKY_API_CODE}/${this.latitude},${this.longitude}?exclude=${this.filter}`
          )
          .then(res => {
            if (res.status === 200) {
              if (this.searchByHourly) {
                this.weatherResults = null;
                this.weatherResultsHourly = res.data.hourly.data;
              } else {
                this.weatherResultsHourly = null;
                this.weatherResults = res.data.daily.data;
              }

              //Only Daily results stored in localstorage
              if (!this.searchByHourly) {
                const parsedResult = JSON.stringify(this.weatherResults);
                localStorage.setItem(city, parsedResult);
                console.log(city);
              }
            }
          })
          .catch(err => this.showAlert(err.message));
      }
    },
    addToFavourites() {
      console.log(this.searchCity);
      this.viewCities = [];
      if (this.searchCity.length == 0) this.showAlert("Search the city first");

      //Check if favourites exists
      if (localStorage.getItem(FAV_CITIES_LIST)) {
        try {
          this.favouriteCities = JSON.parse(
            localStorage.getItem(FAV_CITIES_LIST)
          );
        } catch (e) {
          localStorage.removeItem(FAV_CITIES_LIST);
        }
      } else {
        this.favouriteCities.push(this.searchCity);
        localStorage.setItem(
          FAV_CITIES_LIST,
          JSON.stringify(this.favouriteCities)
        );
      }

      if (this.favouriteCities.indexOf(this.searchCity) === -1) {
        console.log("city not in favourites");
        this.favouriteCities.push(this.searchCity);
        localStorage.setItem(
          FAV_CITIES_LIST,
          JSON.stringify(this.favouriteCities)
        );
      }
    },
    viewFavourites() {
      console.log("in view fav");
      this.favouriteCities = JSON.parse(localStorage.getItem(FAV_CITIES_LIST));
      this.viewCities = this.favouriteCities;
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
