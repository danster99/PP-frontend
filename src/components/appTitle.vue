<template>
  <div class="appTitle">
    <div v-if="restaurant.b2StorageFile">
      <img :src="restaurant.b2StorageFile" class="max-h-10 pl-2 pt-2" />
    </div>
    <div v-else>
        <h1 class="text-3xl text-left pl-2 pt-2 font-black h-10">{{restaurant.name}}</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: "appTitle",
  data() {
    return {
      restaurant: {},
    };
  },
    created() {
        this.getRestaurant();
    },
  methods: {
    async getRestaurant() {
      this.restaurant = JSON.parse(localStorage.getItem("restaurant"));
      console.log(this.restaurant);
    },
  },
};
</script>

<style scoped lang="scss"></style>
