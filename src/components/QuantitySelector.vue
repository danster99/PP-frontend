<template>
    <div class="quantity-toggle">
        <button @click="decrement()">−</button>
        <input type="text" :value="quantity" readonly>
        <button @click="increment()">+</button>
    </div>
</template>
<script>
export default {
    name: 'QuantitySelector',
    props: ['item'],
    data() {
        return {
            quantity: this.item.quantity
        }
    },
    methods: {
        increment() {
            this.quantity++;
            this.updateWishlist();
            this.$parent.$parent.updateTotal();
        },
        decrement() {
            if (this.quantity === 1) {
                if (confirm('Are you sure you want to remove this item from your wishlist?')) {
                    this.removeItemFromWishlist();
                }
            } else {
                this.quantity--;
                this.updateWishlist();
                this.$parent.$parent.updateTotal();
            }
        },
        updateWishlist() {
            let local = JSON.parse(localStorage.getItem('wishlist'));
            local.forEach(element => {
                if (element.title == this.item.title) {
                    element.quantity = this.quantity;
                }
            });
            localStorage.setItem('wishlist', JSON.stringify(local));
        },
        removeItemFromWishlist() {
            let local = JSON.parse(localStorage.getItem('wishlist'));
            local.forEach(element => {
                if (element.title == this.item.title) {
                    local.splice(local.indexOf(element), 1);
                }
            });
            localStorage.setItem('wishlist', JSON.stringify(local));
            window.location.reload();
        }
    }
}
</script>
<style scoped lang="scss">
#app {
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
}

pre {
    background: #eee;
    padding: 1rem;
    border-radius: 5px;
}

$border: 2px solid #ddd;

.quantity-toggle {
    display: flex;

    input {
        border: 0;
        border-top: $border;
        border-bottom: $border;
        border-radius: 0;
        width: 2.2rem;
        text-align: center;
        padding: 0.2rem;
        z-index: 3;
        max-height: 30px;
    }

    button {
        border: $border;
        padding: .4rem;
        background: #f5f5f5;
        color: #888;
        background-color: #fff;
        font-size: 1.5rem;
        border-radius: 16px;
        cursor: pointer;
        z-index: 2;
        max-height: 30px;
        display: flex;
        align-items: center;
    }

    button:first-of-type {
        border-right: none;
        padding-right: 10px;
        transform: translateX(12px);
    }

    button:last-of-type {
        border-left: none;
        padding-left: 10px;
        transform: translateX(-12px);
    }
}
</style>