<template>
  <ion-button color="danger" v-if="!isOnline" expand="block">No Network avaialble</ion-button>
</template>

<script>
export default {
  name: "OnlineIndicator"
};
</script>