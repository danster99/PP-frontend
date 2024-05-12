<template>
    <div
        class="h-16 flex justify-center items-center rounded-lg mt-3 border-[1px] border-black bg-primary text-semibold text-2xl w-5/6 left-0 right-0 ml-10 mr-10">
        {{ text }}
    </div>
</template>

<script>
export default {
    name: 'AppButton',
    props: ['text']
}
</script>
<style scoped>
.bg-primary {
    background-color: var(--primary);
}
</style>