<template>
    <div class="home">
        <appTitle />
        <StoriesBar />
        <div v-for="(categ, key, index) in items" :key="index">
            <h1 class="p-4 font-bold text-2xl capitalize" v-if="categ.length > 0">{{ key }}</h1>
            <MenuCard v-for="(item, index) in categ" :key="index" :title="capitalize(item.name)"
                :description="item.description" :full_description="item.description" :image="item.photo" />
        </div>
        <NavBar />
        <div class="h-8"></div>
    </div>
</template>

<script>
import appTitle from "@/components/appTitle.vue"
import StoriesBar from "@/components/StoriesBar.vue";
import NavBar from "@/components/NavBar.vue"
import MenuCard from "@/components/menuCard.vue"
import axios from 'axios';

export default {
    name: 'MenuView',
    components: {
        appTitle,
        StoriesBar,
        NavBar,
        MenuCard
    },
    data() {
        return {
            items: {},
        }
    },
    created() {
        this.getItems();
    },
    methods: {
        async getItems() {
            try {
                await axios.get('https://plate-pal-97cd0667892d.herokuapp.com/api/menu/1/items/').then(response => {
                    this.items = response.data.food;
                    console.log(this.items)
                });
            } catch (error) {
                console.log(error)
            }
        },
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
    }
}
</script>