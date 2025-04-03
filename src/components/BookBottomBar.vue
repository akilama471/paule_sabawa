<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineProps, ref } from "vue";

// Define props
const props = defineProps({
  audioSrc: {
    type: String,
    default: "",
  },
});

// Create a reference for the audio element
const audioElement = ref(null);
</script>

<template>
  <div class="fixed bottom-0 bg-blue-600 w-full h-16 flex items-center justify-center z-10">
    <router-link to="/" class="px-4 py-2 m-1 text-white rounded-lg" aria-label="Navigate to home page">
        <FontAwesomeIcon icon="fa-solid fa-house"/>
    </router-link>
    <div class="text-center text-white flex justify-center space-x-10 w-full mr-3">
      <div v-if="props.audioSrc" class="audio-player">
        <audio ref="audioElement" :src="props.audioSrc" controls></audio>
      </div>
    </div>
  </div>
</template>