<script setup>
import {ref, onMounted, nextTick} from 'vue';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

// YouTube video URL (Change this as needed)
const videoUrl = ref('https://www.youtube.com/watch?v=O1AHr88aU8g');
const player = ref(null);
const isVideoLoading = ref(true);

// Extract YouTube Video ID from the URL
const getYouTubeVideoId = (url) => {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
};

onMounted(async () => {

  isVideoLoading.value = true;
  await nextTick();

  const videoId = getYouTubeVideoId(videoUrl.value);
  if (!videoId) {
    console.error('Invalid YouTube URL:', videoUrl.value);
    return;
  }

  const plyrInstance = new Plyr(player.value, {
    autoplay: true,
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    youtube: {
      modestbranding: 1,  // Removes YouTube logo
      rel: 0,             // Prevents unrelated videos (only shows same-channel videos)
      showinfo: 0,        // Hides video info/title
      iv_load_policy: 3,  // Hides annotations
      origin: window.location.origin, // Fixes CORS issues
    }
  });

  plyrInstance.on('ready', () => {isVideoLoading.value = false;});
});
</script>

<template>
  <div class="flex flex-col items-center h-screen justify-center m-1">

    <div class="fixed top-0 bg-blue-600 w-full h-20 flex items-center justify-center z-10">
      <div class="text-center flex justify-center w-full">
        <h1 class="font-bold text-white whitespace-nowrap text-xl" :style="{ fontSize: 'clamp(1.8rem, 5vw)' }">
          මොකක්ද මේ පවුලේ සභාව
        </h1>
      </div>
    </div>

    <div class="w-full max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden relative">
      <!-- Loading Spinner -->
      <div v-if="isVideoLoading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p class="text-white ml-2">Loading Video...</p> <!-- Debug Text -->
      </div>


      <!-- Plyr YouTube Video Player -->
      <div class="plyr__video-wrapper">
        <div ref="player" class="plyr" data-plyr-provider="youtube"
             :data-plyr-embed-id="getYouTubeVideoId(videoUrl)"></div>
      </div>
    </div>

    <div class="p-6">
      <h2 class="font-bold text-center text-lg">
        අනාගත ක්‍රිස්තියානි සභා පවුල ශක්තිමත් කරන පවුලේ සභාව පිළිබඳ හැඳින්වීම
      </h2>
    </div>

    <div class="fixed bottom-0 bg-blue-600 w-full h-16 flex items-center justify-center z-10">
      <router-link to="/">
        <button class="px-4 py-2 m-1 text-white rounded-lg">
          <FontAwesomeIcon icon="fa-solid fa-house"/>
        </button>
      </router-link>
      <router-link to="/video">
        <button class="px-4 py-2 m-1 ml-10 mr-10 text-white rounded-lg">
          <FontAwesomeIcon icon="fa-solid fa-video"/>
        </button>
      </router-link>
      <router-link to="/book/1">
        <button class="px-4 py-2 m-1 text-white rounded-lg">
          <FontAwesomeIcon icon="fa-solid fa-book-open"/>
        </button>
      </router-link>
    </div>
  </div>
</template>

