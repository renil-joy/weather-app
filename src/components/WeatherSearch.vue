<template>
  <ion-grid>
    <form @submit="onSubmit">
      <ion-col>
        <ion-item>
          <ion-label>Location:</ion-label>
          <ion-input
            :value="city"
            @input="city =$event.target.value"
            placeholder="Enter City Name"
            name="city"
          ></ion-input>
          <ion-label>Search Hourly:</ion-label>
          <input type="checkbox" v-model="hourly" true-value="true" false-value="false" />
        </ion-item>
      </ion-col>
      <ion-col>
        <ion-button type="submit" color="primary" expand="block">Find</ion-button>
      </ion-col>
    </form>
  </ion-grid>
</template>

<script>
export default {
  name: "WeatherSearch",
  data() {
    return {
      city: "",
      hourly: false
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const isValidCity = true;
      if (!isValidCity) {
        this.showAlert();
        this.city = "";
      } else {
        this.$emit("get-city", this.city, this.hourly);
      }
    },
    showAlert() {
      return this.$ionic.alertController
        .create({
          header: "Enter City Name",
          message: "Please enter a valid city name",
          buttons: ["OK"]
        })
        .then(a => a.present());
    }
  }
};
</script>