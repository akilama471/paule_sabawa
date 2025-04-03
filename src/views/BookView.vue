<script>

import { ref, computed, defineAsyncComponent, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const NavigationBar = defineAsyncComponent(() => import('../components/BookNavigationBar.vue'));
const BottomBar = defineAsyncComponent(() => import('../components/BookBottomBar.vue'));

const pages = {
  "1": defineAsyncComponent(() => import("../components/pages/Page1View.vue")),
  "2": defineAsyncComponent(() => import("../components/pages/Page2View.vue")),
  "3": defineAsyncComponent(() => import("../components/pages/Page3View.vue")),
  "4": defineAsyncComponent(() => import("../components/pages/Page4View.vue")),
  "5": defineAsyncComponent(() => import("../components/pages/Page5View.vue")),
  "6": defineAsyncComponent(() => import("../components/pages/Page6View.vue")),
  "7": defineAsyncComponent(() => import("../components/pages/Page7View.vue")),
};

export default {
  components: {
    NavigationBar,
    BottomBar,
  },
  data() {
    return {
      enterClass: 'animate__animated animate__slideInRight', // Default to next page animation
      leaveClass: 'animate__animated animate__slideOutLeft absolute w-full h-full', // Default to previous page animation
    }
  }, props: {
    pageId: {
      type: String,
      required: true, // or `true` if it should always be provided
    }
  },
  setup() {
    const touchStartX = ref(0);
    const touchEndX = ref(0);
    const router = useRouter();
    const route = useRoute();


    const pagesMeta = {
      "1": { prevPage: "7", nextPage: "2", audio: "/audio/0.mp3" },
      "2": { prevPage: "1", nextPage: "3", audio: "/audio/2.mp3" },
      "3": { prevPage: "2", nextPage: "4", audio: "/audio/3.mp3" },
      "4": { prevPage: "3", nextPage: "5", audio: "/audio/4.mp3" },
      "5": { prevPage: "4", nextPage: "6", audio: "/audio/5.mp3" },
      "6": { prevPage: "5", nextPage: "7", audio: "" },
      "7": { prevPage: "6", nextPage: "1", audio: "/audio/7.mp3" },
    };

    const currentPage = computed(() => pagesMeta[route.params.pageId] || {});
    const currentComponent = computed(() => pages[route.params.pageId] || null);
    const prevPage = computed(() => currentPage.value.prevPage);
    const nextPage = computed(() => currentPage.value.nextPage);

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
          router.push(nextPage.value);
        }
      } else if (touchEndX.value - touchStartX.value > threshold) {
        if (prevPage.value) {
          router.push(prevPage.value);
        }
      }
    };

    onMounted(() => {
      document.addEventListener("touchstart", startTouch, { passive: true });
      document.addEventListener("touchend", endTouch, { passive: true });
    });

    onUnmounted(() => {
      document.removeEventListener("touchstart", startTouch, { passive: true });
      document.removeEventListener("touchend", endTouch, { passive: true });
    });

    return { currentPage, currentComponent, prevPage, nextPage, startTouch, endTouch };
  },
  watch: {
    $route(to, from) {
      const toPage = Number(to.params.pageId);
      const fromPage = Number(from.params.pageId);
      // Compare route order to detect navigation direction
      if (toPage > fromPage) {
        this.enterClass = 'animate__animated animate__slideInRight';
        this.leaveClass = 'animate__animated animate__slideOutLeft absolute';
      } else {
        this.enterClass = 'animate__animated animate__slideInLeft';
        this.leaveClass = 'animate__animated animate__slideOutRight absolute';
      }
    }
  }
};
</script>

<template>
  <div class="flex flex-col h-screen bg-green-100 overflow-x-hidden">
    <div class="flex-grow pt-16 mb-20 overflow-x-hidden">
      <NavigationBar :prevPage="`book/${prevPage}`" :nextPage="`book/${nextPage}`" />
      <transition :enter-active-class="enterClass" :leave-active-class="leaveClass">
        <component :is="currentComponent" v-if="currentComponent" />
      </transition>
    </div>
  </div>
  <BottomBar :audioSrc="currentPage?.audio" />
</template>
