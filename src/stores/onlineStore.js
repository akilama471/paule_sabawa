import { defineStore } from "pinia";
import { ref, watchEffect, onMounted, onUnmounted } from "vue"; 

export const useOnlineStore = defineStore("onlineStore", () => {
  const isOnline = ref(navigator.onLine);

  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine;
    console.log("Online status changed:", isOnline.value);
  };

  onMounted(() => {
    updateOnlineStatus(); // ✅ Update on app load

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
  });

  onUnmounted(() => {
    window.removeEventListener("online", updateOnlineStatus);
    window.removeEventListener("offline", updateOnlineStatus);
  });

  return { isOnline };
});
