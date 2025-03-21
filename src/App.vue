<template>
  <SplashScreen v-if="isLoading" />

  <NavigationBar v-else :prevPage="$route.meta.prevPage" :nextPage="$route.meta.nextPage" />
  <div v-if="!isLoading" @touchstart="startTouch" @touchend="endTouch">
    <router-view v-slot="{ Component, route }">
      <div class="flex flex-col h-screen bg-green-100 overflow-x-hidden">
        <div class="flex-grow pt-16 mb-20 overflow-x-hidden">
          <PageTitle :title="$route.meta.title" />
          <transition :enter-active-class="enterClass" :leave-active-class="leaveClass">
            <component :is="Component" :key="route.name" />
          </transition>
        </div>
      </div>
    </router-view>
  </div>
  
  <!-- Install Toast Notification -->
  <div v-if="showInstallToast" class="install-toast">
    <span>Install this app for a better experience!</span>
    <button @click="installApp" class="install-button">Install</button>
  </div>

  <BottomBar v-if="!isLoading" :audioSrc="$route.meta.audio" />
</template>


<script>

import { ref, computed, defineAsyncComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePWAInstall } from "@/composables/usePWAInstall";

const NavigationBar = defineAsyncComponent(() => import('./components/NavigationBar.vue'));
const PageTitle = defineAsyncComponent(() => import('./components/PageTitle.vue'));
const BottomBar = defineAsyncComponent(() => import('./components/BottomBar.vue'));
const SplashScreen = defineAsyncComponent(() => import('./components/SplashScreen.vue'));

export default {
  components: {
    NavigationBar,
    PageTitle,
    BottomBar,
    SplashScreen
  },
  data() {
    return {
      enterClass: 'animate__animated animate__slideInRight', // Default to next page animation
      leaveClass: 'animate__animated animate__slideOutLeft absolute w-full h-full', // Default to previous page animation
      routes: ["/1", "/2", "/3", "/4", "/5", "/6", "/7"],
      isLoading: true, };
  },
  setup() {
   const { showInstallToast, installApp } = usePWAInstall();
    const touchStartX = ref(0);
    const touchEndX = ref(0);
    const router = useRouter();
    const route = useRoute();

    // Get the current route's meta info dynamically
    const nextPage = computed(() => route.meta.nextPage);
    const prevPage = computed(() => route.meta.prevPage);

    const startTouch = (event) => {
      touchStartX.value = event.touches[0].clientX;
    };

    const endTouch = (event) => {
      touchEndX.value = event.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const threshold = 50; // Minimum swipe distance
      if (touchStartX.value - touchEndX.value > threshold) {
        if (nextPage.value) {
          router.push(`/${nextPage.value}`);
        }
      } else if (touchEndX.value - touchStartX.value > threshold) {
        if (prevPage.value) {
          router.push(`/${prevPage.value}`);
        }
      }
    };

    return { startTouch, endTouch, showInstallToast, installApp };
  },
  watch: {
    $route(to, from) {
      // Compare route order to detect navigation direction
      if (to.path > from.path) {
        // Navigating to the next page (forward navigation)
        this.enterClass = 'animate__animated animate__slideInRight';
        this.leaveClass = 'animate__animated animate__slideOutLeft absolute';
      } else {
        // Navigating to the previous page (backward navigation)
        this.enterClass = 'animate__animated animate__slideInLeft';
        this.leaveClass = 'animate__animated animate__slideOutRight absolute';
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Hide splash after 2 seconds
  }
};
</script>

<style>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* Prevents accidental scrolling */
  touch-action: pan-y;
  /* Allows vertical scrolling but prevents unwanted side effects */
}

.install-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.install-button {
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.install-button:hover {
  background: #0056b3;
}
</style>
