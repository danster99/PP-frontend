<template>
    <div class="flex justify-between border-b-2" @click="showDetailsfunc()">
        <div class="p-3 w-1/4 flex items-center justify-center">
            <img class=" aspect-custom object-contain  rounded-2xl" :src="image" alt="">
        </div>
        <div class="p-1 w-2/4">
            <h2 class="font-bold text-md">{{ title }}</h2>
            <h3 class="font-semibold text-sm">{{ price }} RON</h3>
            <p class="text-base tracking-tighter line-clamp-2">{{ limitLength(description) }}</p>
        </div>
        <div class="flex items-center w-1/4">
            <QuantitySelector :item="{ title, price, description, image, quantity }" />
        </div>
    </div>
</template>

<script>
import QuantitySelector from "@/components/QuantitySelector.vue"
// import showDetailsfunc from "@/components/menuCard.vue"

export default {
    name: 'WishlistCard',
    props: ['title', 'price', 'description', 'image', 'quantity'],
    components: {
        QuantitySelector
    },
    methods: {
        limitLength(str) {
            return str.length > 50 ? str.substring(0, 50) + '...' : str;
        },
    }
}
</script>