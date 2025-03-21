<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
    <div class="fixed top-0 bg-green-600 w-full h-20 flex items-center justify-center z-10">
        <div class="text-center text-white flex justify-center space-x-10 w-full">
            <router-link v-if="prevPage" :to="`/${prevPage}`" custom v-slot="{ navigate }">
                <a @click.prevent="handlePrevClick"
                    class="px-5 py-1 bg-yellow-500 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white rounded whitespace-nowrap !important">
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </a>
            </router-link>
            <h1 class="font-bold text-white text-white whitespace-nowrap" :style="{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }">
            {{ title }}
        </h1>
            <router-link v-if="nextPage" :to="`/${nextPage}`" custom v-slot="{ href, navigate }">
                <a @click.prevent="handleNextClick"
                    class="px-5 py-1 bg-yellow-500 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white rounded whitespace-nowrap !important">
                    <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                </a>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        prevPage: {
            type: [String, Number],
            default: null,
        },
        nextPage: {
            type: [String, Number],
            default: null,
        },
        title: {
            type: String,
            default: "පවුලේ සභාව",
        },
        prevText: {
            type: String,
            default: "පෙර පිටුව",
        },
        nextText: {
            type: String,
            default: "මීලග පිටුව",
        },
    },
    methods: {
        handleNextClick() {
            // Trigger next page transition
            this.$router.push({ path: `/${this.nextPage}` });
        },
        handlePrevClick() {
            // Trigger previous page transition
            this.$router.push({ path: `/${this.prevPage}` });
        }
    }
};
</script>
