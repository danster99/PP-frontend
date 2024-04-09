<template>
    <div class="home">
        <appTitle />
        <div class="flex items-center p-3">
            <img class="h-7 mr-2" src="@/assets/heart_red.png">
            <h1 class="text-2xl">Wishlist</h1>
        </div>
        <WishlistCard v-for="(item, index) in this.wishlist" :key="index" :title="item.title" :price="item.price"
            :description="item.description" :image="item.image" />
        <div class=" h-96"></div>
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
        let wishlist = localStorage.getItem('wishlist');
        if (wishlist) {
            this.wishlist = JSON.parse(wishlist);
        }
        console.log(this.wishlist.length);
    }
}
</script>