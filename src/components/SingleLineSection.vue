<template>
    <div class="w-100">
        <h2 class="mb-2 ml-2 text-2xl font-extrabold mt-3">{{ this.title }}</h2>
        <div class="overflow-x-scroll">
            <div class="flex">
                <div v-for="(card, index) in this.sizes" :key="index">
                    <DisplayCard :size="card.size" :image="card.image" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DisplayCard from '@/components/DisplayCard.vue'
export default {
    name: 'singleLineSection',
    props: ['title', 'sizes'],
    components: {
        DisplayCard
    }
}
</script>