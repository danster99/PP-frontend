<template>
    <div>
        <div class="aspect-small bg-amber-700 h-32 w-40 ml-1 mr-1 rounded-2xl relative" v-if="size == 's'">
            <img class="w-full h-full object-cover  rounded-2xl" :src="image" alt="">
            <h2 class="text-white font-bold text-lg absolute bottom-3 right-3 text-shadow">{{ text }}</h2>
        </div>
        <div class="aspect-medium bg-amber-700 h-32 w-64 ml-1 mr-1 rounded-2xl relative" v-if="size == 'm'">
            <img class="w-full h-full object-cover  rounded-2xl" :src="image" alt="">
            <h2 class="text-white font-bold text-lg absolute bottom-3 right-3 text-shadow">{{ text }}</h2>
        </div>
        <div class="aspect-large bg-amber-700 h-32 w-88 ml-1 mr-1 rounded-2xl relative" v-if="size == 'l'" @click="redirect(link)">
            <img class="w-full h-full object-cover  rounded-2xl" :src="image" alt="">
            <h2 class="text-white font-bold text-lg absolute bottom-3 right-3 text-shadow">{{ text }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DisplayCard',

    props: ['size', 'image', 'text', 'link', 'category'],

    methods: {
        redirect(link) {
            console.log(link);
            if (link) {
                if (link.includes('http')) {
                    window.open(link, '_blank');
                } else {
                    this.$router.push(link);
                }
            }
        }
    }
}
</script>