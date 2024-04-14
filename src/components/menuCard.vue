<template>
    <div>
        <div class="width-full border-b-[3px] border-gray-200 flex justify-between p-1" @click="showDetailsfunc()"
            v-if="!showDetails">
            <div class="flex flex-col pl-2 z-30">
                <h2 class="font-bold text-2xl tracking-tight">{{ title }}</h2>
                <h3 class="text-base font-light mb tracking-tight flex">{{ price }} RON <img
                        src="@/assets/heart-yellow.png" class="h-6 ml-4" @click.stop="addToWishlistParent()" alt="">
                </h3>
                <p class="text-base tracking-tighter">{{ this.limitLength(description) }}</p>
            </div>
            <div class="aspect-small h-36 w-28 rounded-2xl relative z-30 flex items-center justify-end mr-3 ml-6">
                <img class="w-5/6 h-5/6 object-scale-down  rounded-2xl" :src="this.image" alt="">
            </div>
        </div>
        <div class="top-0 left-0 w-full h-screen bg-slate-50 pt-20 pb-6 pr-2 pl-2 border-b-[1px] shadow-lg z-[9999999] flex flex-col justify-center overflow-hidden"
            v-if="showDetails" id="detailed-view">
            <div class="sticky">
                <h2 class="text-3xl text-white font-bold text-m text-shadow absolute right-2 top-2 -translate-y-8"
                    @click="hideDetailsfunc()">X</h2>
                <img class="w-full h-full object-fill  rounded-2xl" :src="this.image" alt="">
            </div>
            <div class="flex flex-col pl-2 bg-slate-50">
                <h2 class="font-semibold text-lg mb-1">{{ title }}</h2>
                <h3 class="text-xl font-light mb-1">{{ price }}</h3>
                <p>{{ full_description }}</p>
                <div class="h-16 flex justify-center items-center rounded-lg mt-3 border-[1px] border-black bg-yellow-500 text-semibold text-2xl w-5/6 left-0 right-0 ml-10 mr-10"
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
    props: ['title', 'price', 'description', 'image', 'full_description'],
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
        }
    }
}
</script>