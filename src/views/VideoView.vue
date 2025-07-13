<script setup>
import { Capacitor } from '@capacitor/core';
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// YouTube video URL (Change this as needed)
const videoUrl = ref('');
const playerElement = ref(null);
const isVideoLoading = ref(true);
const plyrInstance = ref(null);
const videoError = ref(false);
const errorMessage = ref('');

// Extract YouTube Video ID from the URL
const getYouTubeVideoId = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

// Computed property to determine if it's an HTML5 video
const isHtml5 = computed(() => videoUrl.value.endsWith('.mp4'));
const videoId = computed(() => getYouTubeVideoId(videoUrl.value));

// Function to check if video file exists (for mobile)
const checkVideoExists = async (videoPath) => {
  try {
    const response = await fetch(videoPath, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Video file check failed:', error);
    return false;
  }
};

// Initialize video player
const initializePlayer = async () => {
  if (!playerElement.value) return;

  try {
    const plyrConfig = {
      autoplay: false, // Changed to false for better UX
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      settings: ['quality', 'speed'],
      quality: { default: 720, options: [1080, 720, 480, 360] }
    };

    // Add YouTube-specific config for web platform
    if (!isHtml5.value) {
      plyrConfig.youtube = {
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        origin: window.location.origin,
      };
    }

    plyrInstance.value = new Plyr(playerElement.value, plyrConfig);

    // Event listeners
    plyrInstance.value.on('ready', () => {
      console.log('Player is ready');
      isVideoLoading.value = false;
      videoError.value = false;
    });

    plyrInstance.value.on('error', (event) => {
      console.error('Player error:', event);
      isVideoLoading.value = false;
      videoError.value = true;
      errorMessage.value = 'Failed to load video. Please try again.';
    });

    plyrInstance.value.on('loadstart', () => {
      isVideoLoading.value = true;
    });

    plyrInstance.value.on('canplay', () => {
      isVideoLoading.value = false;
    });

  } catch (error) {
    console.error('Failed to initialize player:', error);
    isVideoLoading.value = false;
    videoError.value = true;
    errorMessage.value = 'Video player initialization failed.';
  }
};

onMounted(async () => {
  const platform = Capacitor.getPlatform();

  try {
    if (platform === 'android' || platform === 'ios') {
      // For mobile platforms, use local video
      const localVideoPath = '/video/WWXaB8zolyI.mp4';
      
      // Check if video file exists
      const videoExists = await checkVideoExists(localVideoPath);
      
      if (videoExists) {
        videoUrl.value = localVideoPath;
      } else {
        // Fallback to Capacitor converted path
        videoUrl.value = Capacitor.convertFileSrc('/video/WWXaB8zolyI.mp4');
        
        // Double check with converted path
        const convertedExists = await checkVideoExists(videoUrl.value);
        if (!convertedExists) {
          throw new Error('Video file not found in public folder');
        }
      }
    } else {
      // For web platform, use YouTube
      videoUrl.value = 'https://www.youtube.com/watch?v=WWXaB8zolyI';

      if (!videoId.value) {
        throw new Error('Invalid YouTube URL');
      }
    }

    await nextTick();
    await initializePlayer();

  } catch (error) {
    console.error('Video setup error:', error);
    isVideoLoading.value = false;
    videoError.value = true;
    errorMessage.value = error.message || 'Failed to setup video player';
  }
});

// Cleanup on unmount
onUnmounted(() => {
  if (plyrInstance.value) {
    plyrInstance.value.destroy();
    plyrInstance.value = null;
  }
});

// Retry function
const retryVideo = async () => {
  videoError.value = false;
  isVideoLoading.value = true;
  await initializePlayer();
};
</script>

<template>
  <div class="flex flex-col items-center h-screen justify-center m-1">
    <!-- Header -->
    <div class="fixed top-0 bg-blue-600 w-full h-20 flex items-center justify-center z-10">
      <div class="text-center flex justify-center w-full px-4">
        <h1 class="font-bold text-white whitespace-nowrap text-xl" 
            :style="{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }">
          පවුලේ සභාවට සහභාගි වෙමු
        </h1>
      </div>
    </div>

    <!-- Video Player Container -->
    <div class="w-full max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden relative mt-20 mb-6">
      
      <!-- Loading Spinner -->
      <div v-if="isVideoLoading && !videoError" 
           class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
        <div class="flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mb-3"></div>
          <p class="text-white text-sm">Loading Video...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="videoError" 
           class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
        <div class="text-center p-6">
          <div class="text-red-400 mb-4">
            <FontAwesomeIcon icon="fa-solid fa-exclamation-triangle" class="text-4xl" />
          </div>
          <p class="text-white text-sm mb-4">{{ errorMessage }}</p>
          <button @click="retryVideo" 
                  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            <FontAwesomeIcon icon="fa-solid fa-refresh" class="mr-2" />
            Retry
          </button>
        </div>
      </div>

      <!-- Video Player -->
      <div class="plyr__video-wrapper">
        <!-- YouTube Video for Web -->
        <div v-if="!isHtml5 && !videoError" 
             ref="playerElement" 
             class="plyr" 
             data-plyr-provider="youtube"
             :data-plyr-embed-id="videoId">
        </div>

        <!-- HTML5 Video for Mobile -->
        <video v-else-if="isHtml5 && !videoError" 
               ref="playerElement" 
               class="plyr" 
               playsinline 
               controls 
               preload="metadata">
          <source :src="videoUrl" type="video/mp4" />
          <p class="text-white p-4">Your browser does not support the video tag.</p>
        </video>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 mb-16 text-center max-w-2xl">
      <h2 class="font-bold text-lg mb-2">
        පවුලක් ලෙස එකමුතුවී කරන්නාවූ දිනපතා දේව මෙහෙය​
      </h2>
      <p class="text-gray-600 text-sm">
        Join us for daily family worship and strengthen your spiritual bonds together.
      </p>
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 bg-blue-600 w-full h-16 flex items-center justify-center z-10 shadow-lg">
      <nav class="flex space-x-8">
        <router-link to="/" class="nav-button">
          <FontAwesomeIcon icon="fa-solid fa-house" class="text-xl" />
          <span class="sr-only">Home</span>
        </router-link>
        
        <router-link to="/about" class="nav-button nav-button-active">
          <FontAwesomeIcon icon="fa-solid fa-video" class="text-xl" />
          <span class="sr-only">Videos</span>
        </router-link>
        
        <router-link to="/book/1" class="nav-button">
          <FontAwesomeIcon icon="fa-solid fa-book-open" class="text-xl" />
          <span class="sr-only">Books</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<style scoped>
/* Video player wrapper */
.plyr__video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  background: #000;
}

.plyr__video-wrapper .plyr,
.plyr__video-wrapper video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Navigation buttons */
.nav-button {
  @apply px-4 py-2 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center;
}

.nav-button-active {
  @apply bg-blue-700;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .plyr__video-wrapper {
    margin: 0;
    border-radius: 0;
  }
  
  .nav-button {
    @apply px-3 py-2;
  }
}

/* Custom Plyr styling */
:global(.plyr--full-ui input[type="range"]) {
  color: #3b82f6;
}

:global(.plyr__control--overlaid) {
  background: rgba(59, 130, 246, 0.8);
}

:global(.plyr__control--overlaid:hover) {
  background: rgba(59, 130, 246, 1);
}
</style>