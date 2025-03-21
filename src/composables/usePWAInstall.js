import { ref, onMounted } from "vue";

export function usePWAInstall() {
  const installPrompt = ref(null); // Stores the install event
  const showInstallToast = ref(false); // Controls toast visibility

  // Detect the 'beforeinstallprompt' event
  onMounted(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault(); // Prevent automatic prompt
      installPrompt.value = event; // Store the event
      showInstallToast.value = true; // Show install toast
    });

    // Hide the toast if the app is already installed
    window.addEventListener("appinstalled", () => {
      showInstallToast.value = false;
    });
  });

  // Trigger the installation prompt
  const installApp = async () => {
    if (installPrompt.value) {
      installPrompt.value.prompt(); // Show install popup
      const result = await installPrompt.value.userChoice;
      if (result.outcome === "accepted") {
        showInstallToast.value = false; // Hide toast if installed
      }
      installPrompt.value = null; // Clear the event
    }
  };

  return { showInstallToast, installApp };
}
