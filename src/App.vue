<template>
  <SplashScreen v-if="isLoading" />
  <div v-if="!isLoading">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.name" />
    </router-view>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
const SplashScreen = defineAsyncComponent(() => import('./components/SplashScreen.vue'));

export default {
  components: { SplashScreen },
  setup() {
    const route = useRoute();
    const isLoading = ref(false);
    let splashShown = ref(false); // Prevents showing splash repeatedly

    // Function to show splash only on first visit
    const showSplash = () => {
      if (route.fullPath  == "/" && !splashShown.value) {
        isLoading.value = true;
        splashShown.value = true;
        setTimeout(() => {
          isLoading.value = false;
        }, 5000);
      }
    };

    // Run on component mount
    onMounted(() => {
      showSplash();
    });

    // Watch route changes
    watch(route, (newRoute) => {
      if (newRoute.fullPath  == "/" && !splashShown.value) {
        showSplash();
      }
    });

    return { isLoading };
  },
};
</script>
