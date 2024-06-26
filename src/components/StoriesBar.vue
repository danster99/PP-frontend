<template>
  <div @touchstart="handleTouchStart" @touchend="handleTouchEnd"
    class="h-24 flex overflow-x-scroll w-full justify-between items-center bg-transparent ">
    <div v-for="(story, index) in this.stories" :key="index"
      class="rounded-full aspect-square mx-[10px] border-4 border-primary overflow-hidden flex flex-col justify-center w-1/5 flex-shrink-0"
      @click="openStory(story.b2StorageFile, story)">
      <img :src=story.b2StorageFile class="object-cover" />
    </div>
    <div class="absolute w-screen h-screen top-0 left-0 z-[999] flex flex-col items-center justify-center bg-black self-center"
      v-if="this.showBig">
      <div class="max-w-[500px] w-full h-full flex relative items-center" id="div">
        <div class="absolute w-full h-1 bg-transparent top-0 left-0 rounded-full mt-1 px-1">
          <div :style="{ width: progress + '%' }" class="h-full bg-gray-700 rounded-full transition-all"></div>
        </div>
        
        <p class="text-black font-bold text-m absolute top-5 right-5 text-2xl
                  bg-slate-50 text-center px-2 rounded-3xl z-[99999]" @click="this.closeBig">X
        </p>
        <p class="absolute top-5 left-2 text-xl text-white ">{{ this.currentStory.title }}</p>
        <div class="absolute bottom-0 left-0 h-1/12 w-full pb-1/12">
          <p class=" text-white text-m clamp-2 bg-black bg-opacity-60 px-4 py-2">
            {{ this.currentStory.description ? this.currentStory.description : " TEST DESCRIPTION " }}
          </p>
        </div>
        <img :src="this.currentStoryImg" class="h-5/6 w-full object-cover" />
        <div class="absolute w-full h-screen flex justify-between">
          <div class="absolute w-[33vw] h-screen left-0 z-[9999]" @click="alertLeft(currentStory)"></div>
          <div class="absolute w-[33vw] h-screen right-0 z-[9999]" @click="alertRight(currentStory)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "StoriesBar",
  data() {
    return {
      stories: {},
      currentStoryImg: null,
      showBig: false,
      currentStory: null,
      progress: -1,
      progressTimeout: null,
    };
  },
  mounted() {
    this.getStories();
  },
  watch: {
    progress(newVal) {
      if (newVal == 99) {
        this.alertRight(this.currentStory);
      }
      if (newVal < 99 && newVal > -1) {
        clearTimeout(this.progressTimeout); // Clear the previous timeout
        this.progressTimeout = setTimeout(() => { // Store the timeout ID
          this.progress += 1;
        }, 70);
      }
    }
  },
  methods: {
    async getStories() {
      try {
        const data = await axios.get(
          "https://plate-pal-97cd0667892d.herokuapp.com/api/menu/" + localStorage.getItem('menuId') + "/stories/"
        );
        this.stories = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    openStory(imgUrl, story) {
      this.currentStoryImg = imgUrl;
      this.currentStory = story;
      this.showBig = true;
      this.disableScroll();
      setTimeout(() => {
        this.progress = 0;
      }, 50);
    },
    closeBig() {
      this.enableScroll();
      this.showBig = false;
      this.progress = -10;
    },
    alertLeft(current) {
      clearTimeout(this.progressTimeout);
      this.stories.forEach((element) => {
        if (this.stories.indexOf(current) != 0) {
          if (this.stories.indexOf(element) == this.stories.indexOf(current) - 1) {
            this.currentStory = element;
            this.currentStoryImg = element.b2StorageFile;
            this.progress = 0;
          }
        } else {
          if (this.stories.indexOf(current) == 0) {
            this.showBig = false;
            this.enableScroll();
            this.progress = -10;
          }
        }
      });
    },
    alertRight(current) {
      clearTimeout(this.progressTimeout);
      let index = this.stories.indexOf(current);
        if (index != this.stories.length - 1) {
            this.currentStory = this.stories[index + 1];
            this.currentStoryImg = this.stories[index + 1].b2StorageFile;
            this.progress = 0;
        } else {
            this.showBig = false;
            this.enableScroll();
            this.progress = -10;
        }
    },
    handleTouchStart(e) {
      this.touchStart = e.touches[0].clientY;
    },
    handleTouchEnd(e) {
      this.touchEnd = e.changedTouches[0].clientY;
      if (this.touchEnd - this.touchStart > 100) {
        // adjust this value based on your needs
        // Swipe down detected
        this.doSomethingOnSwipeDown();
      }
    },
    doSomethingOnSwipeDown() {
      this.enableScroll();
      this.showBig = false;
    },
    disableScroll() {
      document.body.style.overflow = "hidden";
    },
    enableScroll() {
      document.body.style.overflow = "auto";
    },
  },
};
</script>
<style scoped>
.border-primary {
  border-color: var(--primary);
}
</style>