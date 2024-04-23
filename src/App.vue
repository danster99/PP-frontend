<template>
  <div id="app">
    <img src="@/assets/background.png" class="fixed top-0 z-[-1]">
    <appTitle />
    <StoriesBar v-if="this.$route.name !== 'details'"/>
    <router-view />
  </div>
</template>

<style>
#app {
  height: auto;
}

.router-view {
  background-color: rgba(255, 255, 255, 0.5);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import appTitle from "@/components/appTitle.vue";
import StoriesBar from "@/components/StoriesBar.vue";

export default {
  name: "App",
  components: {
    appTitle,
    StoriesBar,
  },
};
</script>
