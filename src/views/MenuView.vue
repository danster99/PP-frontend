<template>
    <div class="home">
        <div class="flex overflow-scroll sticky top-0 left-0 bg-white z-[99] bg-opacity-60 mt-3" id="menu">
            <div v-for="(categ, key, index) in items" :key="index" :ref="`${key}-horizontal-ref`">
                <div :class="{ highlited: shouldUnderline(key) }">
                <h3 class="py-3 px-5 capitalize font-semibold h-10 whitespace-nowrap" 
                    @click="scrollTo(key)">{{ key }}</h3>
                </div>
            </div>
        </div>
        <div v-for="(categ, key, index) in items" :key="index" :id="key" :ref="`${key}-ref`">
            <h1 class="p-2 font-bold text-3xl capitalize" v-if="categ.length > 0">{{ key }}</h1>
            <MenuCard v-for="(item, index) in categ" :key="index" :title="capitalize(item.name)"
                :description="item.description" :full_description="item.description" :image="item.b2StorageFile"
                :price="item.price" :spice="item.spiceLvl" :vegan="item.isVegan" :milk="item.isDairyFree"
                :free="item.isGlutenFree" :nutriValues="item.nutriValues" :alergeni="item.alergens" />
        </div>
        <div class="h-4"></div>
        <NavBar />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import MenuCard from "@/components/menuCard.vue"
import axios from 'axios';

export default {
    name: 'MenuView',
    components: {
        NavBar,
        MenuCard
    },
    data() {
        return {
            items: {},
            wishlist: [],
            scrollPosition: null,
            firstScroll: null,
            showNavbarMenu: true,
            focusedComponent: null,
            categories: []
        }
    },
    created() {
        this.getItems();
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    },
    mounted() {
        this.scrollPosition = localStorage.getItem('scrollPosition');
        localStorage.setItem('firstScroll', this.scrollPosition);
        window.addEventListener('scroll', this.updateScrollPosition);
        // document.getElementById('menu').scrollTo({
        //     left: -230,
        //     behavior: 'smooth'
        // });

    },
    methods: {
        scrollToEntry(index) {
            console.log(index);
            const componentRefs = this.$refs[`${index}-horizontal-ref`];
            if (componentRefs) {
                return componentRefs.some(ref => {
                    const rect = ref.getBoundingClientRect();

                    const scrollableDiv = document.getElementById('menu');
                    if (scrollableDiv) {
                        const divRect = scrollableDiv.getBoundingClientRect();
                        const offset = rect.left - divRect.left;
                        const scrollPosition = offset - divRect.width / 2 + rect.width / 2;
                        console.log(scrollPosition);
                        scrollableDiv.scrollTo({
                            left: scrollPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
            return false;
        },
        hideNavbar() {
            this.showNavbarMenu = false;
        },
        showNavbar() {
            this.showNavbarMenu = true;
        },
        async getItems() {
            try {
                await axios.get('https://plate-pal-97cd0667892d.herokuapp.com/api/menu/1/items/').then(response => {
                    this.items = response.data.food;
                    this.categories = Object.keys(this.items);
                    this.focusedComponent = this.categories[0];
                    this.$nextTick(() => {
                        this.firstScroll = localStorage.getItem('firstScroll');
                        if (this.firstScroll != null) {
                            window.scrollTo(0, Number(this.firstScroll));
                        }
                    });
                });
            } catch (error) {
                console.log(error)
            }
        },
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },
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
        },
        scrollTo(id) {
            var headderOffset = 40;
            if (localStorage.getItem('showDetails') == 'false') {
                var element = document.getElementById(id);
                var elementRect = element.getBoundingClientRect().top;
                var offsetPosition = elementRect + window.pageYOffset - headderOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        },
        updateScrollPosition() {
            this.scrollPosition = window.scrollY;
            localStorage.setItem('scrollPosition', this.scrollPosition);
            if (document.getElementById('menu') != null) {
                if (this.scrollPosition > 160 && this.$route.name == 'menu') {
                    document.getElementById('menu').style.backgroundColor = 'rgba(255, 255, 255, 1)';
                } else {
                    document.getElementById('menu').style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                }
            }
            this.categories.forEach(key => {
                if (this.isComponentInFocus(key)) {
                    this.focusedComponent = key;
                }
            });
        },
        isComponentInFocus(index) {
            const componentRefs = this.$refs[`${index}-ref`];
            if (componentRefs) {
                return componentRefs.some(ref => {
                    const rect = ref.getBoundingClientRect();
                    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
                    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

                    // Consider the component in focus if at least half of it is visible
                    return (
                        rect.top + rect.height / 4 >= 0 &&
                        rect.left + rect.width / 4 >= 0 &&
                        rect.bottom - rect.height / 4 <= windowHeight &&
                        rect.right - rect.width / 4 <= windowWidth
                    );
                });
            }
            return false;
        },
        shouldUnderline(index) {
            if(this.focusedComponent == index) {
                this.scrollToEntry(index);
                return true;
            } else {
                return false;
            }
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.updateScrollPosition)
    }
}
</script>
<style scoped lang="scss">
.highlited {
    border-bottom: 6px solid #fbbf24; 
}
</style>