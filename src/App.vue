<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  background-image: url("@/assets/background.png");
  background-position: top right;
  background-size: contain;
  background-repeat: no-repeat;
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
