<template>
    <div class="flex justify-between p-2 border-b-2">
        <div class="p-1">
            <img class="h-24 rounded-lg" src="@/assets/apple-pie.jpg" alt="">
        </div>
        <div class="p-1">
            <h2 class="font-bold text-lg">Apple pie</h2>
            <h3 class="font-semibold text-md">$16.00</h3>
            <p>Freshly baked apple pie with apples sourced from local farms</p>
        </div>
        <div class="p-1 flex items-center">
            <QuantitySelector />
        </div>
    </div>
</template>

<script>
import QuantitySelector from "@/components/QuantitySelector.vue"

export default {
    name: 'WishlistCard',
    components: {
        QuantitySelector
    }
}
</script>