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
                <h3 class="text-base font-light mb tracking-tight flex">{{ price }} RON
                    <svg class="h-6 ml-2 stroke-primary" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" @click.stop="addToWishlistParent()">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </h3>
                <p class="text-base tracking-tighter line-clamp-2">{{ description }}</p>
                <p class="text-base tracking-tighter line-clamp-2">{{ aditives ? aditives : "0 E" }}</p>
                <!-- <p class="text-base tracking-tighter line-clamp-2" v-if="nutriValuesLink">{{ nutriValuesLink }} </p> -->
                <p class="text-base tracking-tighter line-clamp-2">{{ weight ? weight : 0 }} g</p>
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
    props: ['title', 'price', 'description', 'image', 'full_description', 'spice', 'vegan', 'free', 'milk', 'nutriValues', 'nutriValuesLink', 'alergens', 'weight', 'aditives'],
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
            this.$router.push({ name: 'details', params: { title: this.title, price: this.price, description: this.description, image: this.image, full_description: this.full_description, spice: this.spice, vegan: this.vegan, free: this.free, milk: this.milk, nutriValues: this.nutriValues, nutriValuesLink: this.nutriValuesLink, alergens: this.alergens, weight: this.weight, aditives: this.aditives } });
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
        }
    }
}
</script>
<style scoped lang="scss">
.custom-z {
    z-index: 99999 !important;
}

.stroke-primary {
    stroke: var(--primary) !important;
}
</style>
