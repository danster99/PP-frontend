<template>
    <div>
        <div class="width-full border-b-[1px] border-gray-400 flex justify-between p-1" @click="showDetails = true"
            v-if="!showDetails">
            <div class="flex flex-col pl-2 z-30">
                <h2 class="font-semibold text-lg mb-1">{{ title }}</h2>
                <h3 class="text-xl font-light mb-5">{{ price }}</h3>
                <p class="text-sm">{{ this.limitLength(description) }}</p>
            </div>
            <div class="aspect-small h-40 w-40 ml-2 rounded-2xl relative z-30 flex items-center justify-end mr-4">
                <img class="w-4/6 h-4/6 object-fill  rounded-2xl" :src="this.image" alt="">
            </div>
        </div>
        <div class="top-0 left-0 w-full h-full bg-slate-50 pt-6 pb-6 pr-2 pl-2 border-b-[1px] shadow-lg z-[9999999] overflow-hidden"
            v-if="showDetails">
            <div class="sticky">
                <h2 class="text-3xl text-white font-bold text-m text-shadow absolute right-2 top-2"
                    @click="showDetails = false">X</h2>
                <img class="w-full h-full object-fill  rounded-2xl" :src="this.image" alt="">
            </div>
            <div class="flex flex-col pl-2 bg-slate-50">
                <h2 class="font-semibold text-lg mb-1">{{ title }}</h2>
                <h3 class="text-xl font-light mb-1">{{ price }}</h3>
                <p>{{ full_description }}</p>
                <AppButton text="Add to Wishlist" />
            </div>
        </div>
    </div>
</template>

<script>
import AppButton from '@/components/AppButton.vue'
export default {
    name: 'MenuCard',
    props: ['title', 'price', 'description', 'image', 'full_description'],
    components: {
        AppButton
    },
    data: function () {
        return {
            showDetails: false
        }
    },
    methods: {
        limitLength(str) {
            return str.length > 100 ? str.substring(0, 100) + '...' : str;
        }
    }
}
</script>