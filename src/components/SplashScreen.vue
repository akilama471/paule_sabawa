<template>
    <div class="splash-screen">
        <div class="logo-container mt-40 z-20">
            <img src="../assets/logo.webp" alt="App Logo" class="rounded-full w-72 h-72" />
        </div>
        <br />
        <div class="flex items-center mt-4 z-20">
            <svg class="mr-3 size-6 text-white animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle class="opacity-25" cx="12" cy="12" r="10"></circle>
                <path class="opacity-75" d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z"></path>
            </svg>
            <p class="text-lg font-semibold">Loading.....</p>
        </div>
        <br />
        <br />
        <p class="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-white rounded whitespace-nowrap z-20 !important">
            "ගම්මාන අස්වැන්න ක්‍රියාන්විතය"</p>
        <p class="text-lg whitespace-nowrap z-20">උපකාරයකි</p>
        <p class="text-lg whitespace-nowrap z-20">2020</p>
    </div>
</template>

<style scoped>
.splash-screen {
    @apply flex flex-col items-center justify-center w-full h-screen bg-blue-600 text-white;
}
</style>