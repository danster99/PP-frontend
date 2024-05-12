<template>
    <div class="home max-h-screen_40">
        <div class="h-screen_40 flex flex-col justify-between">
            <div class="flex items-center p-3">
                <!-- <svg class="h-7 mr-2" src="@/assets/heart.svg"></svg> -->
                <svg class="h-7 mr-2 stroke-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h1 class="text-2xl h-auto">Wishlist</h1>
            </div>
            <div v-if="this.wishlist.length == 0" class="w-full my-auto h-4/5 flex flex-col justify-center">
                <h1 class="text-center text-xl font-semibold">Your wishlist is
                    currently empty!
                </h1>
            </div>
            <div v-if="this.wishlist.length != 0"
                class="h-4/5 overflow-y-scroll overflow-x-hidden flex flex-col justify-start">
                <WishlistCard v-for="(item, index) in this.wishlist" :key="index" :title="item.title"
                    :price="item.price" :description="item.description" :image="item.image" :quantity="item.quantity" />
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
    created() {
        this.updateTotal();
        let willLoad = true;
        setTimeout(() => {
            if (willLoad) {
                localStorage.setItem('isLoading', 'true');
            }
        }, 200);
        const imagePromises = [];
        Object.values(this.wishlist).forEach((element) => {
            imagePromises.push(new Promise((resolve, reject) => {
                const img = new window.Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = element.image;
            }));
        });
        Promise.all(imagePromises)
            .then(() => {
                localStorage.setItem('isLoading', 'false');
                willLoad = false;
            })
            .catch(() => {
                console.error('Some images failed to load.');
            });
    },
    mounted() {
        window.removeEventListener('scroll', this.updateScroll)
        window.scrollTo(0, 0);
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
<style scoped>
.stroke-primary {
    stroke: var(--primary) !important;
}
</style>
