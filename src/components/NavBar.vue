<template>
    <div class="navbar z-50">
        <div class="h-12 bg-slate-100 flex justify-around rounded-full mt-3 border-[1px] border-black z-50">
            <router-link to="/" class="p-2">
                <img src="../assets/home.png" class="max-h-8">
            </router-link>
            <router-link to="/menu" class="p-2">
                <img src="../assets/burger.png" class="max-h-8">
            </router-link>
            <router-link to="/wishlist" class="p-2">
                <img src="../assets/heart.png" class="max-h-8">
            </router-link>
        </div>
        <div class="h-36 border-t-2 absolute bottom-0 left-0 right-0 bg-slate-50 -z-50 total-bar"
            v-if="this.showTotalsBar">
            <div class="pt-2 pb-2 pr-6 pl-4 flex justify-between">
                <h2 class="text-xl font-semibold">Subtotal:</h2>
                <h2 class="text-xl font-semibold">$158.99</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            showTotalsBar: false
        }
    },
    mounted() {
        if (this.$router.history.current.name == 'wishlist') {
            this.showTotalsBar = true;
        } else {
            this.showTotalsBar = false;
        }
        console.log(this.$router.history.current.name)
    }
}
</script>
<style scoped lang="scss">
.navbar {
    width: 60%;
    position: sticky;
    bottom: 40px;
    left: 20%;
}

.total-bar {
    width: 100vw;
    transform: translate(-20%, 40px);
    bottom: 0;
}
</style>