<template>
    <div>
        <div class="aspect-small bg-amber-700 h-40 w-40 ml-2 mr-2 rounded-2xl relative" v-if="size == 's'">
            <img class="w-full h-full object-fill  rounded-2xl" src="@/assets/apple-pie.jpg" alt="">
            <h2 class="text-white font-bold text-m absolute bottom-3 right-3 text-shadow">Some random text</h2>
        </div>
        <div class="aspect-medium bg-amber-700 h-40 w-48 ml-2 mr-2 rounded-2xl relative" v-if="size == 'm'">
            <img class="w-full h-full object-fill  rounded-2xl" src="@/assets/apple-pie.jpg" alt="">
            <h2 class="text-white font-bold text-m absolute bottom-3 right-3 text-shadow">Some random text</h2>
        </div>
        <div class="aspect-large bg-amber-700 h-40 w-64 ml-2 mr-2 rounded-2xl relative" v-if="size == 'l'">
            <img class="w-full h-full object-fill  rounded-2xl" src="@/assets/apple-pie.jpg" alt="">
            <h2 class="text-white font-bold text-m absolute bottom-3 right-3 text-shadow">Some random text</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DisplayCard',

    props: ['size', 'image']
}
</script>