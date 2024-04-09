<template>
    <div class="flex justify-between border-b-2">
        <div class="p-3 w-1/4 flex items-center justify-center">
            <img class=" w-full aspect-square object-fill rounded-lg" :src="image" alt="">
        </div>
        <div class="p-1 w-2/4">
            <h2 class="font-bold text-md">{{ title }}</h2>
            <h3 class="font-semibold text-sm">${{ price }}</h3>
            <p>{{ limitLength(description) }}</p>
        </div>
        <div class="flex items-center w-1/4">
            <QuantitySelector :item="{ title, price, description, image }" />
        </div>
    </div>
</template>

<script>
import QuantitySelector from "@/components/QuantitySelector.vue"

export default {
    name: 'WishlistCard',
    props: ['title', 'price', 'description', 'image'],
    components: {
        QuantitySelector
    },
    methods: {
        limitLength(str) {
            return str.length > 100 ? str.substring(0, 50) + '...' : str;
        },
    }
}
</script>