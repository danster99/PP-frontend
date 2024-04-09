<template>
    <div class="home">
        <appTitle />
        <div class="flex items-center p-3">
            <img class="h-7 mr-2" src="@/assets/heart_red.png">
            <h1 class="text-2xl">Wishlist</h1>
        </div>
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
        <NavBar />
        <div class=" h-20"></div>

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
    }
}
</script>