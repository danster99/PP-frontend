<template>
  <div id="app">
    <Preloader class="z-[99999]" />
    <div class="content">
      <img
        :src="backgroundImage"
        class="fixed top-0 left-0 z-[-1] max-w-full"
      />
      <!-- <div class="bg-primary">
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
      </div> -->
      <appTitle />
      <StoriesBar
        v-if="this.$route.name !== 'details' && this.$route.name !== 'wishlist'"
      />
      <router-view class="z-3" />
      <NavBar v-if="this.$route.name !== 'details'"/>
    </div>
  </div>
</template>

<style>
.bg-primary {
  background-color: var(--primary);
}

#app {
  height: auto;
  align-items: center;
  justify-content: center;
  display: grid;
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

.content {
  max-width: 100svw;
  width: 100svw;
  height: 100svh;
  justify-content: center;
}

@media (min-width: 500px) {
  .content {
    max-width: 500px;
  }
}
</style>

<script>
import appTitle from "@/components/appTitle.vue";
import StoriesBar from "@/components/StoriesBar.vue";
import Preloader from "@/components/Preloader.vue";
import axios from "axios";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    appTitle,
    StoriesBar,
    Preloader,
    NavBar,
  },
  data() {
    return {
      deferredPrompt: null,
      isLoading: true,
      backgroundImage: "",
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
    this.getMenuId();
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
        console.log(this.isLoading);
      }
    },
    async getParams() {
      let tempId = this.$route.query.menu;
      if (!tempId) {
        tempId = 1;
      }
      try {
        await axios
          .get(
            "https://plate-pal-97cd0667892d.herokuapp.com/api/menu/" +
              tempId +
              "/"
          )
          .then((response) => {
            console.log(response.data.primary);
            let style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML =
              ":root { --primary: " + response.data.primary + "; }";
            document.getElementsByTagName("head")[0].appendChild(style);
            this.backgroundImage = response.data.b2StorageFile;
          });
      } catch (error) {
        console.log(error);
      }
    },
    getMenuId() {
      const id = this.$route.query.menu;
      if (id) {
        localStorage.setItem("menuId", id);
      } else {
        localStorage.setItem("menuId", "1");
      }
      this.getParams();
    },
  },
  // beforeDestroy() {
  //   window.removeEventListener("storage", this.handleStorageChange);
  // },
};
</script>
