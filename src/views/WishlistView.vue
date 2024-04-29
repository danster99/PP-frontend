<template>
    <div class="home max-h-screen_40">
        <div class="h-screen_40 flex flex-col justify-between">
            <div class="flex items-center p-3">
                <img class="h-7 mr-2" src="@/assets/heart-yellow.png">
                <h1 class="text-2xl h-auto">Wishlist</h1>
            </div>
            <div v-if="this.wishlist.length == 0" class="w-full my-auto h-4/5 flex flex-col justify-center">
                <h1 class="text-center text-xl font-semibold">Your wishlist is
                    currently empty!
                </h1>
            </div>
            <div v-if="this.wishlist.length != 0" class="h-4/5 overflow-y-scroll overflow-x-hidden flex flex-col justify-start">
                <WishlistCard v-for="(item, index) in this.wishlist" :key="index" :title="item.title" :price="item.price"
                    :description="item.description" :image="item.image" :quantity="item.quantity" />
            </div>
            <div class="h-1/5 border-t-2 absolut bg-white total-bar">
                <div class="pt-2 pb-2 pr-6 pl-4 flex justify-between">
                    <h2 class="text-xl font-semibold">Subtotal:</h2>
                    <h2 class="text-xl font-semibold">{{ total }} RON</h2>
                </div>
                <NavBar />
            </div>
        </div>
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
        this.total = localStorage.getItem('total');
        window.addEventListener('storage', (event) => {
            this.total = event.detail.storage;
            this.$forceUpdate();
        });
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