<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';

// Access Vue Router
const router = useRouter();

// Define props
const props = defineProps({
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
  }
});

// Methods for navigation
const handleNextClick = () => {
  if (props.nextPage) router.push(`/${props.nextPage}`);
};

const handlePrevClick = () => {
  if (props.prevPage) router.push(`/${props.prevPage}`);
};
</script>

<template>
  <div class="fixed top-0 bg-blue-600 w-full h-20 flex items-center justify-center z-10">
    <div class="text-center text-white flex justify-center space-x-10 w-full">
      <router-link v-if="props.prevPage" :to="`/${props.prevPage}`" class="px-5 py-1 bg-yellow-500 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white rounded whitespace-nowrap !important" aria-label="Navigate to previous page">
          <FontAwesomeIcon icon="fa-solid fa-arrow-left"/>        
      </router-link>
      <h1 class="font-bold text-white whitespace-nowrap" :style="{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }">
        {{ props.title }}
      </h1>
      <router-link v-if="props.nextPage" :to="`/${props.nextPage}`" class="px-5 py-1 bg-yellow-500 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white rounded whitespace-nowrap !important" aria-label="Navigate to next page">
          <FontAwesomeIcon icon="fa-solid fa-arrow-right"/>
      </router-link>
    </div>
  </div>
</template>
