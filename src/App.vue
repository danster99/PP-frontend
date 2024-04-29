<template>
  <div id="app">
    <Preloader/>
    <div>
      <img src="@/assets/background.png" class="fixed top-0 z-[-1]" />
      <div class="bg-yellow-500">
        <div v-if="deferredPrompt" dark>
          <p class="text-black">
            Get our free app. It won't take up space on your phone and also
            works offline!
          </p>
          <div class="w-full flex flex-row justify-evenly">
            <button text @click="dismiss">
              <p class="text-black">Dismiss</p>
            </button>
            <button text @click="install">
              <p class="text-black">Install</p>
            </button>
          </div>
        </div>
      </div>
      <appTitle />
      <StoriesBar
        v-if="this.$route.name !== 'details' && this.$route.name !== 'wishlist'"
      />
      <router-view class="z-3"/>
    </div>
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
import Preloader from "@/components/Preloader.vue";

export default {
  name: "App",
  components: {
    appTitle,
    StoriesBar,
    Preloader,
  },
  data() {
    return {
      deferredPrompt: null,
      isLoading: true,
    };
  },
  created() {
    localStorage.setItem("isLoading", true);
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
    window.addEventListener("storage", this.handleStorageChange);
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.isLoading = false;
  //     localStorage.setItem("isLoading", false);
  //   }, 3000);
  // },
  methods: {
    async dismiss() {
      this.deferredPrompt = null;
    },
    async install() {
      this.deferredPrompt.prompt();
    },
    handleStorageChange(e) {
      if (e.key === "isLoading") {
        this.isLoading = e.newValue === "true";
      }
    },
  },
  // beforeDestroy() {
  //   window.removeEventListener("storage", this.handleStorageChange);
  // },
};
</script>
