<template>
  <div class="relative">
    <!-- Hero / 3D Background -->
    <!-- Hero / 3D Background -->
    <!-- We keep it sticky so it stays visible while scrolling initially, then scrolls away or persists -->
    <div id="solar-system" class="sticky top-0 h-screen z-0">
      <SolarSystem3D ref="solarSystemRef" />
    </div>

    <!-- Content Scroll Flow -->
    <div class="relative z-10 -mt-[50vh] bg-gradient-to-b from-transparent via-space-black to-space-black pt-[50vh]">
      
      <!-- Introduction -->
      <div class="min-h-[50vh] flex items-center justify-center pointer-events-none">
        <!-- Spacer for hero exit -->
      </div>

      <!-- Planet Sections -->
      <div class="space-y-0 bg-space-black">
        <PlanetSection 
          v-for="planet in planets" 
          :key="planet.id" 
          :planet="planet" 
          @open-detail="handleOpenDetail"
        />
      </div>

      <!-- Mission Section -->
      <div id="mission">
        <MissionSection />
      </div>

      <!-- Gallery Section -->
      <div id="gallery">
        <GallerySection />
      </div>

      <!-- Footer Spacer -->
      <div class="h-[20vh] bg-space-black"></div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { usePlanets } from '~/composables/usePlanets';
import { useScrollAnimation } from '~/composables/useScrollAnimation';
import SolarSystem3D from '~/components/SolarSystem3D.vue';
import MissionSection from '~/components/MissionSection.vue';
import GallerySection from '~/components/GallerySection.vue';
import type { Planet } from '~/types/planet';

const { planets } = usePlanets();
const solarSystemRef = ref<InstanceType<typeof SolarSystem3D> | null>(null);
const router = useRouter();

const { initScroll, destroyScroll } = useScrollAnimation((planetId) => {
  solarSystemRef.value?.moveCameraToPlanet(planetId);
});

const handleOpenDetail = (planet: Planet) => {
    // Navigate to /[id]/[uuid]
    router.push(`/${planet.id}/${planet.uuid}`);
};

onMounted(() => {
  // Wait for next tick to ensure DOM is ready and component mounted
  nextTick(() => {
     initScroll();
  });
});

onUnmounted(() => {
  destroyScroll();
});

</script>
