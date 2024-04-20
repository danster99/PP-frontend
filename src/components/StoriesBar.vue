<template>
  <div @touchstart="handleTouchStart" @touchend="handleTouchEnd"
    class="h-24 flex w-full justify-between items-center py-6 px-2 bg-transparent">
    <img v-for="(story, index) in this.stories" :key="index" :src="story.b2StorageFile"
      class="rounded-full w-[24%] aspect-square drop-shadow-2xl border-4 border-yellow-500"
      @click="openStory(story.b2StorageFile, story)" />
    <div class="absolute w-screen h-screen top-0 left-0 z-[999] flex items-center justify-center bg-white"
      v-if="this.showBig">
      <h3 class="absolute top-5 left-5 text-2xl font-black z-[999999]" @click="this.closeBig">
        X
      </h3>
      <img :src="this.currentStoryImg" class="" />
      <div class="absolute w-screen h-screen flex justify-between">
        <div class="absolute w-[33vw] h-screen left-0 z-[9999]" @click="alertLeft(currentStory)"></div>
        <div class="absolute w-[67vw] h-screen right-0 z-[9999]" @click="alertRight(currentStory)"></div>
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
    };
  },
  mounted() {
    this.getStories();
  },
  methods: {
    async getStories() {
      try {
        const data = await axios.get(
          "https://plate-pal-97cd0667892d.herokuapp.com/api/story/"
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
    },
    closeBig() {
      this.enableScroll();
      this.showBig = false;
    },
    alertLeft(current) {
      this.stories.forEach((element) => {
        if (current.id != 1) {
          if (element.id == current.id - 1) {
            this.currentStory = element;
            this.currentStoryImg = element.b2StorageFile;
          }
        } else {
          if (current.id == 1) {
            this.showBig = false;
            this.enableScroll();
          }
        }
      });
    },
    alertRight(current) {
      this.stories.forEach((element) => {
        if (current.id != 4) {
          if (element.id == current.id + 1) {
            this.currentStory = element;
            this.currentStoryImg = element.b2StorageFile;
          }
        } else {
          if (current.id == 4) {
            this.showBig = false;
            this.enableScroll();
          }
        }
      });
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
