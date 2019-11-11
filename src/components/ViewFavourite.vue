<template>
  <ion-grid>
    <form @submit="onSubmit">
      <ion-col>
        <ion-button type="submit" shape="round" color="light">View Favourites</ion-button>
      </ion-col>
    </form>
  </ion-grid>
</template>

<script>
export default {
  name: "ViewFavourite",
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$emit("view-favourite");
    }
  }
};
</script>