<template>
    <div class="splash-screen" :class="{ 'visible': isVisible }">
        <div class="logo-container mt-40 z-20 transition-all duration-1000" 
             :class="{ 'opacity-100 scale-100': isVisible, 'opacity-0 scale-90': !isVisible }">
            <img src="/img/logo.webp" alt="App Logo" class="rounded-full w-72 h-72" />
        </div>
        <br />
        <div class="flex items-center mt-4 z-20 transition-all duration-1000 delay-300"
             :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-4': !isVisible }">
            <svg class="mr-3 size-6 text-white animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle class="opacity-25" cx="12" cy="12" r="10"></circle>
                <path class="opacity-75" d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z"></path>
            </svg>
            <p class="text-lg font-semibold">Loading.....</p>
        </div>
        <br />
        <br />
        <p class="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-white rounded whitespace-nowrap z-20 transition-all duration-1000 delay-500"
           :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-4': !isVisible }">
            "ගම්මාන අස්වැන්න ක්‍රියාන්විතය"</p>
        <p class="text-lg whitespace-nowrap z-20 transition-all duration-1000 delay-600"
           :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-4': !isVisible }">උපකාරයකි</p>
        <p class="text-lg whitespace-nowrap z-20 transition-all duration-1000 delay-700"
           :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-4': !isVisible }">2020</p>
    </div>
</template>

<style scoped>
.splash-screen {
    @apply flex flex-col items-center justify-center w-full h-screen bg-blue-600 text-white;
    transition: opacity 0.8s ease-in-out;
    opacity: 0;
}

.splash-screen.visible {
    opacity: 1;
}

/* Prepare for exit animation */
.splash-screen.fade-out {
    opacity: 0;
    transform: scale(1.05);
    transition: opacity 0.8s ease, transform 0.8s ease;
}
</style>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {
    name: 'SplashScreen',
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