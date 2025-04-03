<script>
import { defineAsyncComponent, watch } from "vue";

import { usePWAInstall } from "../composables/usePWAInstall";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useOnlineStore } from "@/stores/onlineStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";



export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    backgroundStyle() {
      let imageUrl = "";
      if (this.screenWidth >= 1920) {
        imageUrl = "/img/bg-1920.webp"; // Large screens (Desktops)
      } else if (this.screenWidth >= 1280) {
        imageUrl = "/img/bg-1280.webp"; // Large screens (Desktops)
      } else if (this.screenWidth >= 1024) {
        imageUrl = "/img/bg-1024.webp"; // Large screens (Desktops)
      } else if (this.screenWidth >= 768) {
        imageUrl = "/img/bg-768.webp"; // Medium screens (Tablets)
      } else if (this.screenWidth >= 601) {
        imageUrl = "/img/bg-601.webp"; // Medium screens (Tablets)
      } else if (this.screenWidth >= 414) {
        imageUrl = "/img/bg-414.webp"; // Medium screens (Tablets)
      } else {
        imageUrl = "/img/bg-360.webp"; // Small screens (Phones)
      }
      return {
        backgroundImage: `url(${imageUrl})`,
      };
    },
  },
  methods: {
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateScreenWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  setup() {
    const router = useRouter();
    const onlineStore = useOnlineStore();
    const { isOnline } = storeToRefs(onlineStore);

    console.log("App is online:", isOnline.value); // Debugging

    if (!isOnline.value) {
      console.log("Offline detected, redirecting...");
      router.push('/book/1');
    } else {
      console.log('online');
    }

    const { showInstallToast, installApp } = usePWAInstall();
    watch(isOnline, (newStatus) => {
      console.log("🔄 Online status updated:", newStatus);
      if (!newStatus) {
        console.log("❌ Offline detected, redirecting...");
        router.push("/book/1");
      }
    });

    return { isOnline, showInstallToast, installApp };
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen space-y-4 bg-cover bg-center transition-all duration-500"
  :style="backgroundStyle">

    <div class="fixed top-0 bg-blue-500 w-full h-20 flex items-center justify-center z-10">
      <div class="text-center flex justify-center w-full">
        <h1 class="font-bold text-white whitespace-nowrap text-xl" :style="{ fontSize: 'clamp(1.8rem, 5vw)' }">
          පවුලේ සභාව - Paule Sabawa
        </h1>
      </div>
    </div>

    <br>

    <router-link v-if="isOnline" to="/about">
      <div
        class="ml-5 mr-5 max-w-sm rounded-2xl overflow-hidden shadow-lg bg-green-800 hover:shadow-2xl transition-shadow">
        <img class="w-full h-42 object-cover rounded-t-2xl" src="../assets/what_is_paule_sabawa.webp"
          alt="What is paule sabawa">
      </div>
    </router-link>

    <router-link v-if="isOnline" to="/video">
      <div
        class="ml-5 mr-5 max-w-sm rounded-2xl overflow-hidden shadow-lg bg-green-800 hover:shadow-2xl transition-shadow">
        <img class="w-full h-42 object-cover rounded-t-2xl" src="../assets/join_with_paule_sabawa.webp"
          alt="Join with paule sabawa">
      </div>
    </router-link>

    <router-link v-if="!isOnline" to="/book/1">
      <div
        class="ml-5 mr-5 max-w-sm rounded-2xl overflow-hidden shadow-lg bg-green-800 hover:shadow-2xl transition-shadow">
        <img class="w-full h-42 object-cover rounded-t-2xl" src="../assets/book_of_paule_sabawa.webp"
          alt="Book of paule sabawa">
      </div>
    </router-link>

    <!-- Install app prompt -->
    <div v-if="showInstallToast" class="install-toast">
      <button @click="installApp" class="install-button">
        <FontAwesomeIcon icon="fa-solid fa-download" /> Install as App
      </button>
    </div>

    <div class="fixed bottom-0 bg-blue-600 w-full h-16 flex items-center justify-center text-white z-10">
      "ගම්මාන අස්වැන්න ක්‍රියාන්විතය" - 2020 - 2025
    </div>

  </div>
</template>

<style>
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.install-button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
