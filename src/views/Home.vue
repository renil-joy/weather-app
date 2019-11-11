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
      <WeatherInfo v-bind:weatherresults="weatherresults" />
    </ion-content>
  </div>
</template>

<script>
import WeatherSearch from "../components/WeatherSearch";
import WeatherInfo from "../components/WeatherInfo";
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
      weatherresults: [],
      favouriteCities: [],
      viewCities: []
    };
  },
  methods: {
    getCityDetails(city) {
      this.searchCity = city;
      this.viewCities = [];
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
    addToFavourites() {
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
