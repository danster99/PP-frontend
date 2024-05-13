<template>
    <div class="navbar z-50">
        <div class="h-14 bg-primary flex justify-around rounded-3xl border-black z-50 px-2 py-1">
            <router-link to="/home" class="p-2"  active-class="active">
                <img src="../assets/home.png" class="max-h-8">
            </router-link>
            <router-link to="/menu" class="p-2"  active-class="active">
                <img src="../assets/burger.png" class="max-h-8">
            </router-link>
            <router-link to="/drinks" class="p-2"  active-class="active">
                <img src="../assets/cocktail.png" class="max-h-8">
            </router-link>
            <router-link to="/wishlist" class="p-2"  active-class="active">
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
    width: 100%;
    position: sticky;
    bottom: 25px;
    padding-inline: 25%;
}

.active {
    border-radius: 100%;
    background-color: white;
}
</style>