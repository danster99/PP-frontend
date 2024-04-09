<template>
    <div class="home">
        <appTitle />
        <StoriesBar />
        <div class="flex items-center pl-4 pt-4">
            <img src="@/assets/star.png" class="h-6">
            <h1 class="text-2xl ml-2 font-semibold">Feedback</h1>
        </div>
        <h2 class="pl-4 mb-8">Your feedback fuels us</h2>
        <div class="flex flex-col justify-center items-center mb-10">
            <h1 class="text-3xl font-semibold pb-2">Food</h1>
            <div class="flex items-center">
                <h2 class="text-xl pr-4">Rating: </h2>
                <StarRating />
            </div>
        </div>
        <div class="flex flex-col justify-center items-center mb-10">
            <h1 class="text-3xl font-semibold pb-2">Drinks</h1>
            <div class="flex items-center">
                <h2 class="text-xl pr-4">Rating: </h2>
                <StarRating />
            </div>
        </div>
        <div class="flex flex-col justify-center items-center mb-10">
            <h1 class="text-3xl font-semibold pb-2">Service</h1>
            <div class="flex items-center">
                <h2 class="text-xl pr-4">Rating: </h2>
                <StarRating />
            </div>
        </div>
        <div class="flex flex-col justify-center items-center mb-10">
            <h1 class="text-3xl font-semibold pb-2">Menu experience</h1>
            <div class="flex items-center">
                <h2 class="text-xl pr-4">Rating: </h2>
                <StarRating />
            </div>
        </div>
        <div class="flex justify-center items-center flex-col">
            <textarea rows="4" cols="50" placeholder="Enjoying Todd's? Please leave a quick review..."
                class="border-2 w-11/12 p-4 bg-slate-100 rounded-xl text-black"></textarea>
            <h4 class="mt-6 bg-yellow-500 p-2 w-11/12 text-center text-white font-semibold text-xl rounded-lg">
                Submit
            </h4>
        </div>
        <NavBar />
        <div class="h-8"></div>
    </div>
</template>

<script>
import appTitle from "@/components/appTitle.vue"
import StoriesBar from "@/components/StoriesBar.vue";
import NavBar from "@/components/NavBar.vue"
import StarRating from 'vue-star-rating'

export default {
    name: 'CallWaiter',
    components: {
        appTitle,
        StoriesBar,
        NavBar,
        StarRating
    }
}
</script>