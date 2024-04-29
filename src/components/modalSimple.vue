<template>
    <div>
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h2 class="text-xl">Added to Wishlist!</h2>
                <button @click="closeModal()">OK</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false
        };
    },
    props: ['show', 'parentGoBack'],
    methods: {
        closeModal() {
            this.showModal = false;
            if (this.parentGoBack) {
                this.parentGoBack();
            }
        },
        showModalMethod() {
            this.showModal = true;
            return true;
        }
    }
}
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999999999999;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
}

button {
    background-color: #FBBF23;
    padding: 10px 20px;
    width: 100%;
    border-radius: 20px;
    margin-top: 15px;
    color: white;
}
</style>