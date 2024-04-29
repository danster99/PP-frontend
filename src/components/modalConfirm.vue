<template>
    <div>
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h2 class="text-xl">Are you sure you want to remove this item from your wishlist?</h2>
                <div class="flex">
                    <button @click="closeModal()" class="cancel-btn">Cancel</button>
                    <button @click="confirmDelete()">OK</button>
                </div>
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
    props: ['show', 'parentRemove'],
    methods: {
        closeModal() {
            this.showModal = false;
        },
        showModalMethod() {
            this.showModal = true;
            return true;
        },
        confirmDelete() {
            this.closeModal();
            if (this.parentRemove) {
                this.parentRemove();
            }
        },
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
    width: 90%;
}

button {
    background-color: #FBBF23;
    padding: 10px 20px;
    width: 100%;
    border-radius: 20px;
    margin: 15px 5px 0 5px;
    color: white;
}

.cancel-btn {
    background-color: black;
}
</style>