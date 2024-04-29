<template>
  <div @touchstart="handleTouchStart" @touchend="handleTouchEnd"
    class="h-24 flex w-full justify-between items-center py-6 px-2 bg-transparent">
    <img v-for="(story, index) in this.stories" :key="index" :src="story.b2StorageFile"
      class="rounded-full w-[24%] aspect-square drop-shadow-2xl border-4 border-yellow-500 object-cover"
      @click="openStory(story.b2StorageFile, story)" />
    <div class="absolute w-screen h-screen top-0 left-0 z-[999] flex flex-col items-center justify-center bg-black"
      v-if="this.showBig">
      <div class="absolute w-screen h-1 bg-transparent top-0 left-0 rounded-full mt-1 px-1">
        <div :style="{ width: progress + '%' }" class="h-full bg-gray-700 rounded-full transition-all"></div>
      </div>
      <p class="text-2xl text-black font-bold text-m absolute top-5 right-5 text-2xl
                bg-slate-50 text-center px-2 rounded-3xl z-[99999]" @click="this.closeBig">X
    </p>
      <p class="absolute top-5 left-2 text-xl text-white ">{{this.currentStory.title}}</p>
      <p class="absolute bottom-2 left-2 h-1/12 text-white text-m ">{{this.currentStory.description ? this.currentStory.description : " TEST DESCRIPTION "}}</p>
      <img :src="this.currentStoryImg" class="h-5/6 w-full object-cover" />
      <div class="absolute w-screen h-screen flex justify-between">
        <div class="absolute w-[33vw] h-screen left-0 z-[9999]" @click="alertLeft(currentStory)"></div>
        <div class="absolute w-[33vw] h-screen right-0 z-[9999]" @click="alertRight(currentStory)"></div>
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
          "https://plate-pal-97cd0667892d.herokuapp.com/api/story/"
        );
        this.stories = data.data;
      } catch (error) {
        console.log(error);
      }
    },
    openStory(imgUrl, story) {
      console.log(story);
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
      this.stories.forEach((element) => {
        if (this.stories.indexOf(current) != 3) {
          if (element.id == current.id + 1) {
            this.currentStory = element;
            this.currentStoryImg = element.b2StorageFile;
            this.progress = 0;
          }
        } else {
          if (this.stories.indexOf(current) == 3) {
            this.showBig = false;
            this.enableScroll();
            this.progress = -10;
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