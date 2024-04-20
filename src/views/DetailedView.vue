<template>
    <div
        class="top-0 left-0 w-full h-screen bg-slate-50 pt-5 pb-6 pr-4 pl-4 border-b-[1px] shadow-lg flex flex-col justify-center overflow-hidden custom-z">
        <div class="sticky flex flex-col justify-center items-center w-full h-2/5 bg-red mb-2">
            <h2 class="text-3xl text-black font-bold text-m absolute right-4 top-10 -translate-y-4" @click="goBack()">X
            </h2>
            <img class=" w-3/5 max-w-4/5 mt-1 aspect-custom object-fit rounded-2xl" :src="this.image" alt="">
        </div>
        <div class="flex flex-col bg-slate-50">
            <div class="flex">
                <h2 class="font-semibold text-2xl mb-1 ">{{ title }}</h2>
                <img src="@/assets/chilli.png" class="h-5 ml-2 mt-1" v-if="spice > 0">
                <img src="@/assets/chilli.png" class="h-5 ml-1 mt-1" v-if="spice > 1">
                <img src="@/assets/chilli.png" class="h-5 ml-1 mt-1" v-if="spice > 2">
            </div>
            <h3 class="text-lg font-light mb-1">{{ price }} RON</h3>
            <div class="flex flex-col overflow-scroll">
                <p class=" max-h-24 overflow-scroll">{{ full_description }}</p>
                <p v-if="nutriValues">Valori nutritionale:</p>
                <div v-if="nutriValues">
                    <div v-for="(value, key) in sortNutriValues(nutriValues)" :key="key" class="flex flex-wrap text-xs">
                        <p class="ml-2">{{ key }}: {{ value }}</p>
                    </div>
                </div>
            </div>
            <p class="text-xs max-h-20 overflow-scroll" v-if="alergeni">Alergeni: {{ alergeni }}</p>
            <div class="flex mt-2">
                <img src="@/assets/vegan.png" class="h-9" v-if="vegan">
                <img src="@/assets/free.png" class="h-10" v-if="free">
                <img src="@/assets/milk.png" class="h-10" v-if="milk">
            </div>
            <div class="h-16 flex justify-center items-center rounded-lg mt-3 border-[1px] text-white bg-yellow-500 text-bold text-2xl w-5/6 left-0 right-0 ml-10 mr-10 drop-shadow-xl -translate-x-2"
                @click="addToWishlist(title, price, description, image)">
                Add to Wishlist
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DetailedView',
    props: ['title', 'price', 'description', 'image', 'full_description', 'spice', 'vegan', 'free', 'milk', 'nutriValues', 'alergeni'],
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
            window.alert('Added to Wishlist');
            this.goBack();
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
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>