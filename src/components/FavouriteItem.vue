<template>
  <div>
    <div v-for="favourite in favourites" v-bind:key="favourite.index">{{favourite}}</div>
  </div>
</template>

<script>
export default {
  name: "FavouriteItem",
  props: ["favourites"]
};
</script>