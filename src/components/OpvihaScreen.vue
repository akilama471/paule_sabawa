<template>
    <div class="splash-screen" :class="{ 'visible': isVisible }">
        <div class="logo-container z-20 transition-all duration-1000" 
             :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 -translate-y-8': !isVisible }">
            <img src="/img/opviha.webp" alt="App Logo" class="responsive-image" />
        </div>
        <br />
    </div>
</template>

<style scoped>
.splash-screen {
    @apply flex flex-col items-center justify-center w-full h-screen bg-blue-600 text-white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.8s ease-in-out;
    opacity: 0;
}

.splash-screen.visible {
    opacity: 1;
}

.logo-container {
    @apply flex justify-center items-center;
    width: 100%;
    max-width: 100%;
    padding: 0 1rem;
}

/* Responsive image styles */
.responsive-image {
    /* Small mobile devices */
    @apply h-48 w-auto mx-auto;

    /* Medium screens */
    @apply sm:h-56 md:h-64;

    /* Large screens */
    @apply lg:h-72 xl:h-80;

    /* Ensure image maintains aspect ratio */
    object-fit: contain;
    max-width: 100%;
}

/* Prepare for exit animation */
.splash-screen.fade-out {
    opacity: 0;
    transform: scale(1.05);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

/* Adjust container margin for different screens */
@media (max-width: 640px) {
    .logo-container {
        margin-top: 2rem;
    }
}

@media (min-width: 641px) and (max-width: 1024px) {
    .logo-container {
        margin-top: 4rem;
    }
}

@media (min-width: 1025px) {
    .logo-container {
        margin-top: 6rem;
    }
}
</style>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {
  name: 'OpvihaScreen',
  emits: ['finished'],
  setup(props, { emit }) {
    const isVisible = ref(false);
    let timer = null;
    let exitTimer = null;
    
    onMounted(() => {
      // Small delay before showing the entrance animation
      setTimeout(() => {
        isVisible.value = true;
      }, 100);
      
      // Set timer for exit
      timer = setTimeout(() => {
        // Start exit animation
        isVisible.value = false;
        document.querySelector('.splash-screen').classList.add('fade-out');
        
        // Emit finished event after exit animation
        exitTimer = setTimeout(() => {
          emit('finished');
        }, 800); // Match the exit animation duration
      }, 4200); // Slightly shorter than 5s to account for transition
    });
    
    onBeforeUnmount(() => {
      // Clean up timers if component is unmounted
      if (timer) clearTimeout(timer);
      if (exitTimer) clearTimeout(exitTimer);
    });
    
    return {
      isVisible
    };
  }
}
</script>