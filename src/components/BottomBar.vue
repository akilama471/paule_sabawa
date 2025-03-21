<template>
    <div class="fixed bottom-0 bg-green-600 w-full h-16 flex items-center justify-center z-10">
        <div class="text-center text-white flex justify-center space-x-10 w-full">
            <div class="audio-player">
                <audio v-if="audioSrc" ref="audioElement" :src="audioSrc" controls></audio>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        audioSrc: {
            type: String,
            default: "",
        }
    },
};
</script>
