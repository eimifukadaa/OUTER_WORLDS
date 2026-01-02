<template>
  <section :id="planet.slug" class="min-h-screen flex items-center justify-center relative py-20 border-b border-white/5">
    <div class="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      <!-- Planet Image Visualization -->
      <div 
        class="relative group cursor-pointer"
        @click="$emit('open-detail', planet)"
      >
        <div class="absolute -inset-4 bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div class="relative aspect-square rounded-full overflow-hidden border border-white/10 shadow-2xl shadow-black">
          <img 
            :src="planet.featured_image" 
            :alt="planet.name" 
            class="w-full h-full object-cover transform transition-transform duration-[20s] hover:scale-110"
            loading="lazy"
          />
          <!-- Overlay Gradient -->
          <div class="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent pointer-events-none"></div>
        </div>
        <p class="text-xs text-center mt-4 text-gray-500 font-mono opacity-60">
          IMAGE CREDIT: {{ planet.image_credit }}
        </p>
        
        <!-- Interactive Hint -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span class="bg-black/50 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-xs font-mono tracking-widest text-white">
                CLICK TO EXPLORE
            </span>
        </div>
      </div>

      <!-- Data Content -->
      <div class="space-y-8">
        <div>
          <h2 class="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter mb-2">
            {{ planet.name }}
          </h2>
          <p class="text-xl text-cosmic-cyan font-light tracking-widest uppercase">
            {{ planet.tagline }}
          </p>
        </div>

        <p class="text-gray-300 leading-relaxed text-lg border-l-2 border-cosmic-gold pl-6">
          {{ planet.fun_fact }}
        </p>

        <!-- Data Grid -->
        <div class="grid grid-cols-2 gap-6 font-mono text-sm opacity-90">
          <div class="p-4 border border-white/10 bg-white/5 rounded backdrop-blur-sm">
            <span class="block text-gray-500 text-xs uppercase mb-1">Diameter</span>
            <span class="text-xl">{{ formatNumber(planet.diameter) }} km</span>
          </div>
          <div class="p-4 border border-white/10 bg-white/5 rounded backdrop-blur-sm">
            <span class="block text-gray-500 text-xs uppercase mb-1">Avg Temp</span>
            <span class="text-xl">{{ planet.avg_temperature }}</span>
          </div>
          <div class="p-4 border border-white/10 bg-white/5 rounded backdrop-blur-sm">
            <span class="block text-gray-500 text-xs uppercase mb-1">Day/Year</span>
            <span class="text-xl">{{ planet.year_length }}</span>
          </div>
          <div class="p-4 border border-white/10 bg-white/5 rounded backdrop-blur-sm">
            <span class="block text-gray-500 text-xs uppercase mb-1">Distance from Earth</span>
            <span class="text-xl text-cosmic-gold">{{ formatNumber(planet.avg_distance_from_earth_km) }} km</span>
          </div>
        </div>

        <!-- Travel Time Visualization -->
        <div class="pt-6">
          <div class="flex justify-between items-end mb-2">
            <span class="text-sm font-light text-gray-400">HUMAN TRAVEL TIME (Current Tech)</span>
            <span class="text-xl font-bold text-white">{{ planet.travel_time_display }}</span>
          </div>
          <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-cosmic-blue to-cosmic-cyan"
              :style="{ width: getTravelProgress(planet.travel_time_days) }"
            ></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Planet } from '~/types/planet';

const props = defineProps<{
  planet: Planet
}>();

const emit = defineEmits(['open-detail']);

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('id-ID').format(num);
};

const getTravelProgress = (days: number) => {
  // Simple visualization scale (max ~12 years = 4380 days)
  const maxDays = 4500;
  const percentage = Math.min(100, Math.max(5, (days / maxDays) * 100));
  return `${percentage}%`;
};
</script>
