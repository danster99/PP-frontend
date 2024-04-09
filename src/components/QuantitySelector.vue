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
    data() {
        return {
            quantity: 1
        }
    },
    props: ['item'],
    methods: {
        increment() {
            this.quantity++
        },
        decrement() {
            if (this.quantity === 1) {
                if (confirm('Are you sure you want to remove this item from your wishlist?')) {
                    let local = JSON.parse(localStorage.getItem('wishlist'));
                    local.forEach(element => {
                        console.log(element, this.item)
                        if (element.title == this.item.title) {
                            local.splice(local.indexOf(element), 1);
                            localStorage.setItem('wishlist', JSON.stringify(local));
                            window.location.reload();
                        }
                    });
                }
            } else {
                this.quantity--
            }
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