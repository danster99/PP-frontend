<template>
    <div>
        <div class="width-full border-b-[2px] border-gray-200 flex justify-between p-1" @click="showDetailsfunc()"
            v-if="!showDetails">
            <div class="flex flex-col pl-2 z-30 w-8/12">
                <div class="flex items-center">
                    <h2 class="font-bold text-2xl tracking-tight pb-2 ">{{ title }}</h2>
                    <img src="@/assets/chilli.png" class="h-5 ml-2" v-if="spice > 0">
                    <img src="@/assets/chilli.png" class="h-5 ml-1" v-if="spice > 1">
                    <img src="@/assets/chilli.png" class="h-5 ml-1" v-if="spice > 2">
                </div>
                <h3 class="text-base font-light mb tracking-tight flex">{{ price }} RON <img
                        src="@/assets/heart-yellow.png" class="h-6 ml-2" @click.stop="addToWishlistParent()" alt="">
                </h3>
                <p class="text-base tracking-tighter line-clamp-2">{{ description }}</p>
                <div class="flex mt-2">
                    <img src="@/assets/vegan.png" class="h-8" v-if="vegan">
                    <img src="@/assets/free.png" class="h-9" v-if="free">
                    <img src="@/assets/milk.png" class="h-9" v-if="milk">
                </div>
            </div>
            <div class="aspect-custom w-4/12 rounded-2xl relative z-30 flex items-center justify-end p-3">
                <img class="aspect-custom object-contain  rounded-2xl" :src="this.image" alt="">
            </div>
        </div>
        <modalSimple ref="modalSimple" />
    </div>
</template>

<script>
import modalSimple from './modalSimple.vue';
export default {
    name: 'MenuCard',
    components: {
        modalSimple
    },
    props: ['title', 'price', 'description', 'image', 'full_description', 'spice', 'vegan', 'free', 'milk', 'nutriValues', 'alergeni'],
    data: function () {
        return {
            showDetails: false,
            isLocked: true
        }
    },
    created() {
        window.removeEventListener('scroll', this.updateScrollPosition);
    },
    mounted() {

        localStorage.setItem('showDetails', 'false');
    },
    methods: {
        limitLength(str) {
            return str.length > 80 ? str.substring(0, 80) + ' ...' : str;
        },
        showDetailsfunc() {
            this.$router.push({ name: 'details', params: { title: this.title, price: this.price, description: this.description, image: this.image, full_description: this.full_description, spice: this.spice, vegan: this.vegan, free: this.free, milk: this.milk, nutriValues: this.nutriValues, alergeni: this.alergeni } });
        },
        hideDetailsfunc() {
            this.$parent.showNavbar();
            this.showDetails = false;
            this.enableScroll()
            localStorage.setItem('showDetails', 'false');
            this.$forceUpdate();
        },
        addToWishlistParent() {
            this.$parent.addToWishlist(this.title, this.price, this.description, this.image);
            this.$refs.modalSimple.showModalMethod();
        },
        disableScroll() {
            document.body.style.overflow = 'hidden';
        },
        enableScroll() {
            document.body.style.overflow = 'auto';
        },
        sortNutriValues(nutriValues) {
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