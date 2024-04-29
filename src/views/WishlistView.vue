<template>
    <div class="home">
        <div class="flex items-center p-3">
            <img class="h-7 mr-2" src="@/assets/heart-yellow.png">
            <h1 class="text-2xl">Wishlist</h1>
        </div>
        <h1 v-if="this.wishlist.length == 0" class="w-full text-center text-xl mt-24 font-semibold">Your wishlist is
            currently empty!
        </h1>

        <WishlistCard v-for="(item, index) in this.wishlist" :key="index" :title="item.title" :price="item.price"
            :description="item.description" :image="item.image" :quantity="item.quantity" />
        <div class=" h-screen"></div>
        <NavBar />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import WishlistCard from "@/components/WishlistCard.vue"

export default {
    name: 'WishlistView',
    components: {
        NavBar,
        WishlistCard
    },
    data() {
        return {
            wishlist: [],
            total: 0
        }
    },
    mounted() {
        window.removeEventListener('scroll', this.updateScroll)
        window.scrollTo(0, 0);
        this.updateTotal();
    },
    methods: {
        updateTotal() {
            let wishlist = localStorage.getItem('wishlist');
            this.total = 0;
            if (wishlist) {
                this.wishlist = JSON.parse(wishlist);
                this.wishlist.forEach(item => {
                    this.total += parseFloat(item.price) * item.quantity;
                });
            }
            localStorage.setItem('total', this.total);
            window.dispatchEvent(new CustomEvent('storage', {
                detail: {
                    storage: localStorage.getItem('total')
                }
            }));
        }
    }
}
</script>