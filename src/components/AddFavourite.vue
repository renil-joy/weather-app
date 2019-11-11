<template>
  <ion-grid>
    <form @submit="onSubmit">
      <ion-col>
        <ion-button type="submit" shape="round" color="dark">Add Favourite</ion-button>
      </ion-col>
    </form>
  </ion-grid>
</template>

<script>
export default {
  name: "AddFavourite",
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$emit("add-favourite");
    }
  }
};
</script>