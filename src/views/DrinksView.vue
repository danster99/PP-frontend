<template>
    <div class="home">
        <appTitle />
        <StoriesBar />
        <div class="flex overflow-scroll sticky top-0 bg-white z-[99] bg-opacity-60 mt-3 justify-around" id="menu">
            <div v-for="(categ, key, index) in items" :key="index" class="">
                <h3 class="p-3 capitalize font-semibold h-12 whitespace-nowrap" @click="scrollTo(key)">{{ key }}</h3>
            </div>
        </div>
        <div v-for="(categ, key, index) in items" :key="index" :id="key">
            <h1 class="p-2 font-bold text-3xl capitalize" v-if="categ.length > 0">{{ key }}</h1>
            <MenuCard v-for="(item, index) in categ" :key="index" :title="capitalize(item.name)"
                :description="item.description" :full_description="item.description" :image="item.photo"
                :price="item.price" />
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
            wishlist: [],
            scrollPosition: null
        }
    },
    created() {
        this.getItems();
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    },
    mounted() {
        window.addEventListener('scroll', this.updateScrollPosition);
    },
    methods: {
        async getItems() {
            try {
                await axios.get('https://plate-pal-97cd0667892d.herokuapp.com/api/menu/1/items/').then(response => {
                    this.items = response.data.drinks;
                    console.log(this.items)
                });
            } catch (error) {
                console.log(error)
            }
        },
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },
        addToWishlist(title, price, description, image) {
            let exists = false;
            this.wishlist.forEach(element => {
                if (element.title == title) {
                    element.quantity += 1;
                    exists = true;
                }
            });
            if (!exists) {
                this.wishlist.push({
                    title: title,
                    price: price,
                    description: description,
                    image: image,
                    quantity: 1
                });
            }
            localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
            console.log(localStorage.getItem('wishlist'));
        },
        scrollTo(id) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        },
        updateScrollPosition() {
            this.scrollPosition = window.scrollY;
            if (document.getElementById('menu') != null) {
                if (this.scrollPosition > 160 && this.$route.name == 'menu') {
                    document.getElementById('menu').style.backgroundColor = 'rgba(255, 255, 255, 1)';
                } else {
                    document.getElementById('menu').style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                }
            }

        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.updateScroll)
    }
}
</script>
<style scoped lang="scss">
.highlited {
    font-weight: 900;
    text-decoration: underline;
}
</style>