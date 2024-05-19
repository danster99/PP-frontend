<template>
    <div class="w-100 mb-2">
        <h2 class="ml-2 text-2xl font-extrabold" v-if="title">{{ this.title }}</h2>
        <div class="overflow-x-scroll">
            <div class="flex">
                <div v-for="(card, index) in this.sizes" :key="index">
                    <DisplayCard :size="card.size" :image="card.image" :text="card.text" :link="card.link"/>
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