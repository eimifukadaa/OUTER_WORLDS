<template>
  <div class="w-full h-screen bg-black">
    <PlanetDetail3D 
      v-if="planet" 
      :planet="planet" 
      @close="goBack" 
    />
    <div v-else class="flex items-center justify-center h-full text-white font-mono">
      Initializing Deep Space Scan...
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { planets } = usePlanets();

const planet = computed(() => {
  const id = route.params.id as string;
  const uuid = route.params.uuid as string;
  
  // Try to find by UUID first (more specific), then ID
  return planets.value.find(p => p.uuid === uuid || p.id === id);
});

const goBack = () => {
  router.push('/');
};

// Redirect if invalid
onMounted(() => {
  if (!planet.value) {
    console.warn('Invalid Planet ID/UUID');
    router.push('/');
  }
});
</script>
