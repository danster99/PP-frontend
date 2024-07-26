<template>
    <div
        class="top-0 left-0 w-full bg-transparent shadow-lg flex flex-col justify-between overflow-hidden custom-z rounded-2xl h-screen_40 min-h-screen_40">
        <div class="sticky flex flex-col justify-center items-center w-11/12 bg-red top-2 msx-h-3/6 m-auto">
            <h2 class="text-2xl text-black font-bold text-m absolute right-4 top-4 
                bg-slate-50 text-center px-2 rounded-3xl" @click="goBack()">X
            </h2>
            <img class="aspect-custom object-fit rounded-2xl " :src="this.image" alt="" />
        </div>
        <div class="flex flex-col py-4 px-2 h-3/5 justify-between">
            <div class="h-1/6">
                <div class="flex">
                    <h2 class="font-semibold text-2xl">{{ title }}</h2>
                    <img src="@/assets/chilli.png" class="h-5 ml-2 mt-1" v-if="spice > 0">
                    <img src="@/assets/chilli.png" class="h-5 ml-1 mt-1" v-if="spice > 1">
                    <img src="@/assets/chilli.png" class="h-5 ml-1 mt-1" v-if="spice > 2">
                </div>
                <h3 class="text-lg font-light mb-1">{{ price }} RON</h3>
            </div>
            <div class="overflow-y-scroll overflow-x-hidden h-5/6 mt-2">
                <div class="flex flex-col overflow-y-scroll">
                    <p>{{ full_description }}</p>
                    <p class="max-h-20 overflow-scroll">Greutate: {{ weight }}g</p>
                    <p class="max-h-20 overflow-scroll" v-if="alergens">Alergeni: {{ alergens }}</p>
                    <p class="max-h-20 overflow-scroll">Aditivi: {{ aditives ? aditives : "0 (E)" }}</p>
                    <p v-if="nutriValues">Valori nutritionale per 100g:</p>
                    <div v-if="nutriValues">
                        <!-- <div v-for="(value, key) in sortNutriValues(nutriValues)" :key="key"
                            class="flex flex-wrap text-xs">
                            <p class="ml-2">{{ key }}: {{ value }}</p>
                        </div> -->
                        <div class="flex flex-wrap text-xs">
                            <p><strong>{{sortNutriValues(nutriValues)}}</strong></p>
                        </div>
                    </div>
                    <a :href="nutriValuesLink" target="_blank" rel="noopener noreferrer" class="max-h-20 overflow-scroll text-primary" v-if="nutriValuesLink">{{ nutriValuesLink }}</a>
                </div>
                <div class="flex mt-2">
                    <img src="@/assets/vegan.png" class="h-9" v-if="vegan">
                    <img src="@/assets/free.png" class="h-10" v-if="free">
                    <img src="@/assets/milk.png" class="h-10" v-if="milk">
                </div>
            </div>
            <div class="h-16 flex justify-center items-center rounded-lg mt-3 mb-5 border-[1px] text-white bg-primary text-bold text-2xl w-5/6 left-0 right-0 ml-10 mr-10 drop-shadow-xl -translate-x-2"
                @click="addToWishlist(title, price, description, image)">
                Add to Wishlist
            </div>
        </div>
        <modalSimple ref="modalSimpleDetails" :parentGoBack="goBack" />
    </div>
</template>
<script>
import modalSimple from '@/components/modalSimple.vue';

export default {
    name: 'DetailedView',
    components: {
        modalSimple
    },
    props: ['title', 'price', 'description', 'image', 'full_description', 'spice', 'vegan', 'free', 'milk', 'nutriValues', 'nutriValuesLink', 'alergens', 'weight', 'aditives'],
    data: function () {
        return {
            showDetails: false,
            isLocked: true,
            wishlist: JSON.parse(localStorage.getItem('wishlist')) || []
        }
    },
    methods: {
        addToWishlist(title, price, description, image) {
            let exists = false;
            this.wishlist.forEach(element => {
                if (element.title == title) {
                    element.quantity += 1;
                    exists = true;
                }
            });
            if (!exists) {
                this.wishlist.push({
                    title: title,
                    price: price,
                    description: description,
                    image: image,
                    quantity: 1
                });
            }
            localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
            this.$refs.modalSimpleDetails.showModal = true;
        },
        sortNutriValues(nutriValues) {
            let sorted = "";
            sorted += "Valoare energetica: " + nutriValues["Valoare energetica"];
            sorted += "; Grasimi: " + nutriValues["Grasimi"];
            sorted += "; Acizi grasi saturati: " + nutriValues["Acizi grasi saturati"];
            sorted += "; Glucide: " + nutriValues["Glucide"];
            sorted += "; Zaharuri: " + nutriValues["Zaharuri"];
            sorted += "; Proteine: " + nutriValues["Proteine"];
            sorted += "; Sare: " + nutriValues["Sare"];
            // sorted["Valoare energetica"] = nutriValues["Valoare energetica"];
            // sorted["Grasimi"] = nutriValues["Grasimi"];
            // sorted["Acizi grasi saturati"] = nutriValues["Acizi grasi saturati"];
            // sorted["Glucide"] = nutriValues["Glucide"];
            // sorted["Zaharuri"] = nutriValues["Zaharuri"];
            // sorted["Proteine"] = nutriValues["Proteine"];
            // sorted["Sare"] = nutriValues["Sare"];
            console.log(sorted);
            return sorted;
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
.bg-primary {
    background-color: var(--primary);
}
</style>