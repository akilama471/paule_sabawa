<template>
    <h1 class="text-center pb-5 pt-5" :style="{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }">
        <strong>{{ title }}</strong>
    </h1>
    <hr />
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "",
        }
    },
};
</script>
