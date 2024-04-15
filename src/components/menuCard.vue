<template>
    <div>
        <div class="width-full border-b-[3px] border-gray-200 flex justify-between p-1" @click="showDetailsfunc()"
            v-if="!showDetails">
            <div class="flex flex-col pl-2 z-30">
                <div class="flex items-center">
                    <h2 class="font-bold text-2xl tracking-tight">{{ title }}</h2>
                    <img src="@/assets/chilli.png" class="h-5 ml-2" v-if="spice > 0">
                    <img src="@/assets/chilli.png" class="h-5 ml-1" v-if="spice > 1">
                    <img src="@/assets/chilli.png" class="h-5 ml-1" v-if="spice > 2">
                </div>
                <h3 class="text-base font-light mb tracking-tight flex">{{ price }} RON <img
                        src="@/assets/heart-yellow.png" class="h-6 ml-2" @click.stop="addToWishlistParent()" alt="">
                </h3>
                <p class="text-base tracking-tighter">{{ this.limitLength(description) }}</p>
                <div class="flex mt-2">
                    <img src="@/assets/vegan.png" class="h-8" v-if="vegan">
                    <img src="@/assets/free.png" class="h-9" v-if="free">
                    <img src="@/assets/milk.png" class="h-9" v-if="milk">
                </div>
            </div>
            <div class="aspect-small h-36 w-28 rounded-2xl relative z-30 flex items-center justify-end mr-3 ml-6">
                <img class="w-5/6 h-5/6 object-scale-down  rounded-2xl" :src="this.image" alt="">
            </div>
        </div>
        <div class="top-0 left-0 w-full h-screen bg-slate-50 pt-5 pb-6 pr-2 pl-2 border-b-[1px] shadow-lg flex flex-col justify-center overflow-hidden custom-z"
            v-if="showDetails" id="detailed-view">
            <div class="sticky flex flex-col justify-center items-center w-full h-2/5 bg-red mb-2">
                <h2 class="text-3xl text-black font-bold text-m absolute right-4 top-10 -translate-y-8"
                    @click="hideDetailsfunc()">X</h2>
                <img class=" w-9/12 height-9/12 object-fill rounded-2xl" :src="this.image" alt="">
            </div>
            <div class="flex flex-col bg-slate-50">
                <div class="flex">
                    <h2 class="font-semibold text-2xl mb-1 ">{{ title }}</h2>
                    <img src="@/assets/chilli.png" class="h-5 ml-2 mt-1" v-if="spice > 0">
                    <img src="@/assets/chilli.png" class="h-5 ml-1 mt-1" v-if="spice > 1">
                    <img src="@/assets/chilli.png" class="h-5 ml-1 mt-1" v-if="spice > 2">
                </div>
                <h3 class="text-lg font-light mb-1">{{ price }} RON</h3>
                <p>{{ full_description }}</p>
                <p>Valori nutritionale:</p>
                <div v-for="(value, key) in sortNutriValues(nutriValues)" :key="key" class="flex flex-wrap text-xs">
                    <p class="ml-2">{{ key }}: {{ value }}</p>
                </div>
                <p class="text-xs">Alergeni: {{ alergeni }}</p>
                <div class="flex mt-2">
                    <img src="@/assets/vegan.png" class="h-9" v-if="vegan">
                    <img src="@/assets/free.png" class="h-10" v-if="free">
                    <img src="@/assets/milk.png" class="h-10" v-if="milk">
                </div>
                <div class="h-16 flex justify-center items-center rounded-lg mt-3 border-[1px] text-white bg-yellow-500 text-bold text-2xl w-5/6 left-0 right-0 ml-10 mr-10 drop-shadow-xl -translate-x-2"
                    @click="addToWishlistParent()">
                    Add to Wishlist
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuCard',
    props: ['title', 'price', 'description', 'image', 'full_description', 'spice', 'vegan', 'free', 'milk', 'nutriValues', 'alergeni'],
    data: function () {
        return {
            showDetails: false,
            isLocked: true
        }
    },
    mounted() {

        localStorage.setItem('showDetails', 'false');
    },
    methods: {
        limitLength(str) {
            return str.length > 80 ? str.substring(0, 80) + ' ...' : str;
        },
        showDetailsfunc() {
            console.log('clicked', localStorage.getItem('showDetails'));
            if (localStorage.getItem('showDetails') != 'true') {
                this.showDetails = true;
                this.$nextTick(() => {
                    document.getElementById('detailed-view').scrollIntoView();
                    this.disableScroll();
                });
                localStorage.setItem('showDetails', 'true');
            }
        },
        hideDetailsfunc() {
            this.showDetails = false;
            this.enableScroll()
            localStorage.setItem('showDetails', 'false');
        },
        addToWishlistParent() {
            console.log('clicked');
            this.$parent.addToWishlist(this.title, this.price, this.description, this.image);
            window.alert('Added to Wishlist');
        },
        disableScroll() {
            document.body.style.overflow = 'hidden';
        },
        enableScroll() {
            document.body.style.overflow = 'auto';
        },
        sortNutriValues(nutriValues) {
            console.log(nutriValues);
            let sorted = {};
            sorted["Valoare energetica"] = nutriValues["Valoare energetica"];
            sorted["Grasimi"] = nutriValues["Grasimi"];
            sorted["Acizi grasi saturati"] = nutriValues["Acizi grasi saturati"];
            sorted["Glucide"] = nutriValues["Glucide"];
            sorted["Zaharuri"] = nutriValues["Zaharuri"];
            sorted["Proteine"] = this.nutriValues["Proteine"];
            sorted["Sare"] = nutriValues["Sare"];
            return sorted;
        }
    }
}
</script>
<style scoped lang="scss">
.custom-z {
    z-index: 99999 !important;
}
</style>