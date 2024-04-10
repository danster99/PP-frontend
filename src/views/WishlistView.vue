<template>
    <div class="home">
        <appTitle />
        <div class="flex items-center p-3">
            <img class="h-7 mr-2" src="@/assets/heart_red.png">
            <h1 class="text-2xl">Wishlist</h1>
        </div>
        <h1 v-if="this.wishlist.length == 0" class="w-full text-center text-xl mt-24 font-semibold">Your wishlist is
            currently empty!
        </h1>

        <WishlistCard v-for="(item, index) in this.wishlist" :key="index" :title="item.title" :price="item.price"
            :description="item.description" :image="item.image" />
        <div class=" h-screen"></div>
        <NavBar />
    </div>
</template>

<script>
import appTitle from "@/components/appTitle.vue"
import NavBar from "@/components/NavBar.vue"
import WishlistCard from "@/components/WishlistCard.vue"

export default {
    name: 'WishlistView',
    components: {
        appTitle,
        NavBar,
        WishlistCard
    },
    data() {
        return {
            wishlist: []
        }
    },
    mounted() {
        window.scrollTo(0, 0);
        let wishlist = localStorage.getItem('wishlist');
        let total = 0;
        if (wishlist) {
            this.wishlist = JSON.parse(wishlist);
            this.wishlist.forEach(item => {
                total += parseFloat(item.price);
            });
        }
        localStorage.setItem('total', total);
        console.log(this.wishlist.length);
        console.log("total", total);
    }
}
</script>