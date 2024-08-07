<template>
  <div class="home min-h-full">
    <div
      class="flex overflow-scroll sticky top-0 left-0 bg-white z-[99] bg-opacity-60"
      id="menu-drinks"
    >
      <div
        v-for="(categ, key, index) in items"
        :key="index"
        :ref="`${key}-horizontal-ref`"
      >
        <div :class="{ highlited: shouldUnderline(key) }">
          <h3
            class="py-3 px-5 capitalize font-semibold h-10 whitespace-nowrap"
            @click="scrollTo(key)"
          >
            {{ key }}
          </h3>
        </div>
      </div>
    </div>
    <div
      v-for="(categ, key, index) in items"
      :key="index"
      :id="key"
      :ref="`${key}-ref`"
      v-intersect="handleIntersection"
    >
      <h1 class="p-2 font-bold text-3xl capitalize" v-if="categ.length > 0">
        {{ key }}
      </h1>
      <MenuCard
        v-for="(item, index) in categ"
        :key="index"
        :title="capitalize(item.name)"
        :description="item.description"
        :full_description="item.description"
        :image="item.b2StorageFile"
        :price="item.price"
        :spice="item.spiceLvl"
        :vegan="item.isVegan"
        :milk="item.isDairyFree"
        :free="item.isGlutenFree"
        :nutriValues="item.nutriValues"
        :nutriValuesLink="item.nutriValuesLink"
        :alergens="item.alergens"
        :weight="item.weight"
        :aditives="item.aditives"
      />
    </div>
    <div class="h-4"></div>
  </div>
</template>

<script>
import MenuCard from "@/components/menuCard.vue";
import axios from "axios";

export default {
  name: "DrinksView",
  components: {
    MenuCard,
  },
  data() {
    return {
      items: {},
      wishlist: [],
      scrollPosition: null,
      firstScroll: null,
      showNavbarMenu: true,
      focusedComponent: null,
      categories: [],
    };
  },
  created() {
    let willLoad = true;
    setTimeout(() => {
      if (willLoad) {
        localStorage.setItem("isLoading", "true");
      }
    }, 200);
    this.getItems()
      .then(() => {
        const imagePromises = [];
        Object.values(this.items).forEach((item) => {
          item.forEach((element) => {
            imagePromises.push(
              new Promise((resolve, reject) => {
                const img = new window.Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = element.b2StorageFile;
              })
            );
          });
        });
        Promise.all(imagePromises)
          .then(() => {
            localStorage.setItem("isLoading", "false");
            willLoad = false;
          })
          .catch(() => {
            console.error("Some images failed to load.");
          });
      })
      .catch((error) => {
        console.error(error);
      });

    this.wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  },
  mounted() {
    this.scrollPosition = localStorage.getItem("scrollPosition");
    localStorage.setItem("firstScroll", this.scrollPosition);
    window.addEventListener("scroll", this.updateScrollPosition);
    
    if (this.$route.query.category) {
      setTimeout(() => {
        this.scrollTo(this.$route.query.category);
      }, 500);
    }
  },
  methods: {
    handleIntersection(categoryId) {
      this.focusedComponent = categoryId;
    },
    scrollToEntry(index) {
        const componentRefs = this.$refs[`${index}-horizontal-ref`];
      if (componentRefs) {
        return componentRefs.some((ref) => {
          const rect = ref.getBoundingClientRect();
          let leftWidth = 0;
            for (let i = 0; i < this.categories.indexOf(index); i++) {
                leftWidth += this.$refs[`${this.categories[i]}-horizontal-ref`][0]
                .getBoundingClientRect().width;
            }
          const scrollableDiv = document.getElementById("menu-drinks");
          if (scrollableDiv) {
            const scrollPosition = leftWidth + rect.width / 2 - scrollableDiv.getBoundingClientRect().width / 2;
            scrollableDiv.scrollTo({
              left: scrollPosition,
              behavior: "smooth",
            });
          }
        });
      }
      return false;
    },
    hideNavbar() {
      this.showNavbarMenu = false;
    },
    showNavbar() {
      this.showNavbarMenu = true;
    },
    async getItems() {
      try {
        await axios
          .get(
            "https://plate-pal-97cd0667892d.herokuapp.com/api/menu/" +
              localStorage.getItem("menuId") +
              "/items/"
          )
          .then((response) => {
            this.items = response.data.drinks;
            this.categories = Object.keys(this.items);
            this.focusedComponent = this.categories[0];
            this.$nextTick(() => {
              this.firstScroll = localStorage.getItem("firstScroll");
              if (this.firstScroll != null) {
                window.scrollTo(0, Number(this.firstScroll));
              }
            });
          });
      } catch (error) {
        console.log(error);
      }
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    addToWishlist(title, price, description, image) {
      let exists = false;
      this.wishlist.forEach((element) => {
        if (element.title == title) {
          element.quantity += 1;
          exists = true;
        }
      });
      if (!exists) {
        this.wishlist.push({
          title: title,
          price: price,
          description: description,
          image: image,
          quantity: 1,
        });
      }
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    },
    scrollTo(id) {
        var headderOffset = 40;
      if (localStorage.getItem("showDetails") == "false") {
        var element = document.getElementById(id);
        var elementRect = element.getBoundingClientRect().top;
        var offsetPosition = elementRect + window.pageYOffset - headderOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    updateScrollPosition() {
      this.scrollPosition = window.scrollY;
      localStorage.setItem("scrollPosition", this.scrollPosition);
      if (document.getElementById("menu-drinks") != null) {
        if (this.scrollPosition > 160 && this.$route.name == "drinks") {
          document.getElementById("menu-drinks").style.backgroundColor =
            "rgba(255, 255, 255, 1)";
        } else {
          document.getElementById("menu-drinks").style.backgroundColor =
            "rgba(255, 255, 255, 0.6)";
        }
      }
    },
    shouldUnderline(index) {
      if (this.focusedComponent == index) {
        this.scrollToEntry(index);
        return true;
      } else {
        return false;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.updateScrollPosition);
  },
};
</script>
<style scoped lang="scss">
.highlited {
  border-bottom: 6px solid;
  border-color: var(--primary);
}
</style>
