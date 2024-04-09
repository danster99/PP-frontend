<template>
    <div class="h-24 flex justify-around items-center w-full p-6 bg-transparent">
        <img v-for="(story, index) in this.stories" :key="index" :src="(story.b2StorageFile)"
            class="rounded-full h-20 w-20 drop-shadow-2xl" @click="openStory(story.b2StorageFile, story)">
        <div class="absolute w-screen h-screen top-0 left-0 z-[999] flex items-center justify-center bg-white"
            v-if="this.showBig">
            <h3 class="absolute top-5 left-5 text-2xl font-black z-[999999]" @click="this.closeBig">X</h3>
            <img :src="this.currentStoryImg" class="">
            <div class="absolute w-screen h-screen flex justify-between">
                <div class="absolute w-[33vw] h-screen left-0 z-[9999]" @click='alertLeft(currentStory)'>

                </div>
                <div class="absolute w-[67vw] h-screen right-0 z-[9999]" @click='alertRight(currentStory)'>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'StoriesBar',
    data() {
        return {
            stories: {},
            currentStoryImg: null,
            showBig: false,
            currentStory: null
        }
    },
    mounted() {
        this.getStories()
    },
    methods: {
        async getStories() {
            try {
                const data = await axios.get('https://plate-pal-97cd0667892d.herokuapp.com/api/story/');
                this.stories = data.data;
                console.log(this.stories)
            } catch (error) {
                console.log(error);
            }
        },
        openStory(imgUrl, story) {
            this.currentStoryImg = imgUrl
            this.currentStory = story;
            this.showBig = true;
        },
        closeBig() {
            this.showBig = false;
        },
        alertLeft(current) {
            this.stories.forEach(element => {
                if (current.id != 1) {
                    if (element.id == current.id - 1) {
                        this.currentStory = element;
                        this.currentStoryImg = element.b2StorageFile;
                    }
                }
            });
        },

        alertRight(current) {
            this.stories.forEach(element => {
                if (current.id != 4) {
                    if (element.id == current.id + 1) {
                        this.currentStory = element;
                        this.currentStoryImg = element.b2StorageFile;
                    }
                }
            });
        }
    }
}
</script>