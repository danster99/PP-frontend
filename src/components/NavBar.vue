<template>
    <div class="navbar z-50">
        <div class="h-12 bg-slate-200 flex justify-around rounded-full mt-3 border-black z-50">
            <router-link to="/" class="p-2">
                <img src="../assets/home.png" class="max-h-8">
            </router-link>
            <router-link to="/menu" class="p-2">
                <img src="../assets/burger.png" class="max-h-8">
            </router-link>
            <router-link to="/drinks" class="p-2">
                <img src="../assets/cocktail.png" class="max-h-8">
            </router-link>
            <router-link to="/wishlist" class="p-2">
                <img src="../assets/heart.png" class="max-h-8">
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
}
</script>
<style scoped lang="scss">
.navbar {
    width: 50%;
    position: sticky;
    bottom: 25px;
    left: 25%;
}
</style>