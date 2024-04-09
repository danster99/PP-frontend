<template>
    <div class="quantity-toggle">
        <button @click="decrement()">&mdash;</button>
        <input type="text" :value="quantity" readonly>
        <button @click="increment()">&#xff0b;</button>
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
    methods: {
        increment() {
            this.quantity++
        },
        decrement() {
            if (this.quantity === 1) {
                alert('Negative quantity not allowed')
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
        width: 2.5rem;
        text-align: center;
        padding: 0 .5rem;
    }

    button {
        border: $border;
        padding: .5rem;
        background: #f5f5f5;
        color: #888;
        font-size: 1rem;
        cursor: pointer;
    }
}
</style>