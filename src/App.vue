<template>
  <!-- Fixed background that remains throughout transitions -->
  <div class="fixed-background"></div>

  <!-- Use absolute positioning for transitions instead of mode="out-in" -->
  <Transition name="fade">
    <OpvihaScreen v-if="isOpviha" @finished="onOpvihaFinished" />
  </Transition>
  
  <Transition name="fade">
    <SplashScreen v-if="isLoading" @finished="onSplashFinished" />
  </Transition>
  
  <Transition name="fade">
    <div v-if="!isOpviha && !isLoading" class="main-content">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.name" />
      </router-view>
    </div>
  </Transition>
</template>

<script>
import { defineAsyncComponent, ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const SplashScreen = defineAsyncComponent(() => import('./components/SplashScreen.vue'));
const OpvihaScreen = defineAsyncComponent(() => import('./components/OpvihaScreen.vue'));

export default {
  components: { SplashScreen, OpvihaScreen },
  setup() {
    const route = useRoute();
    const isOpviha = ref(false);
    const isLoading = ref(false);
    const opvihaShown = ref(false); // Prevents showing splash repeatedly
    const splashShown = ref(false); // Prevents showing splash repeatedly

    const showSplash = () => {
      if (route.fullPath === "/" && !opvihaShown.value) {
        isOpviha.value = true;
        opvihaShown.value = true;
      }
    };

    // Called when OpvihaScreen animation completes
    const onOpvihaFinished = () => {
      // Show the splash screen before hiding Opviha
      // This ensures there's overlap between screens
      if (!splashShown.value) {
        isLoading.value = true;
        splashShown.value = true;
      }
      
      // Short delay before hiding OpvihaScreen
      setTimeout(() => {
        isOpviha.value = false;
      }, 300);
    };

    // Called when SplashScreen animation completes
    const onSplashFinished = () => {
      setTimeout(() => {
        isLoading.value = false;
      }, 500); // Allow fade-out animation to complete
    };

    // Run on component mount
    onMounted(() => {
      showSplash();
    });

    // Watch route changes
    watch(() => route.fullPath, (newPath) => {
      if (newPath === "/" && !opvihaShown.value) {
        showSplash();
      }
    });

    return { 
      isOpviha, 
      isLoading, 
      onOpvihaFinished,
      onSplashFinished
    };
  },
};
</script>

<style>
/* Global transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Fixed background that matches the splash screen background */
.fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2563eb; /* Tailwind's bg-blue-600 equivalent */
  z-index: -1;
}

/* Position each page as a full overlay */
.splash-screen,
.main-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

/* Ensure main content is above splash screens when active */
.main-content {
  z-index: 20;
  background-color: white; /* Or whatever your main app background is */
}
</style>