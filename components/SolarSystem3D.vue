<template>
  <div ref="container" class="w-full h-screen relative bg-space-black overflow-hidden z-10">
    <canvas ref="canvas" class="block outline-none cursor-move"></canvas>
    
    <!-- Overlay UI -->
    <div class="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-20 text-center">
      <h1 class="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter mb-4 animate-float">
        EARTH <span class="text-cosmic-cyan">→</span> OUTER WORLDS
      </h1>
      <p class="text-lg md:text-xl font-light text-cosmic-detail max-w-3xl px-6 mb-4 leading-relaxed">
        A digital museum exhibition exploring the real scale of our solar system and the human endeavor to reach beyond.
      </p>
      <p class="text-sm font-mono text-cosmic-cyan tracking-widest opacity-90 animate-pulse">
        By : @Dendy__F
      </p>
      
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
        <span class="text-xs font-mono uppercase tracking-widest text-cosmic-cyan">Scroll to Explore</span>
        <div class="w-px h-12 bg-gradient-to-b from-cosmic-cyan to-transparent animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSolarSystem } from '~/composables/useSolarSystem';
import { usePlanets } from '~/composables/usePlanets';

const container = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const { planets } = usePlanets();

const { init, destroy, moveCameraToPlanet } = useSolarSystem(canvas, container, planets);

onMounted(() => {
  init();
});

onUnmounted(() => {
  destroy();
});

defineExpose({
  moveCameraToPlanet
});
</script>
