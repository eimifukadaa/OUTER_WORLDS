<template>
  <section id="gallery" class="min-h-screen py-24 border-b border-white/5 bg-space-black relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="mb-16">
        <h2 class="text-xs font-mono text-cosmic-purple tracking-[0.3em] uppercase mb-4">Visual Archives</h2>
        <h3 class="text-4xl md:text-5xl font-display font-bold text-white">COSMIC ARTIFACTS</h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Gallery Items (Static for now, will connect to Directus) -->
        <div v-for="(image, index) in galleryImages" :key="index" class="group relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-900 cursor-pointer">
          <img 
            :src="image.url" 
            :alt="image.caption"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span class="text-cosmic-cyan text-xs font-mono mb-2">{{ image.planet }}</span>
            <p class="text-white font-display text-lg leading-tight">{{ image.caption }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { GalleryItem } from '~/types/planet';
const { fetchGallery } = useDirectus();

const galleryImages = ref<GalleryItem[]>([
  {
    url: 'https://images-assets.nasa.gov/image/PIA01320/PIA01320~orig.jpg',
    planet: 'JUPITER',
    caption: 'Great Red Spot Turbulence',
    credit: 'NASA/JPL'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA01486/PIA01486~orig.jpg',
    planet: 'SATURN',
    caption: 'The Rings in High Definition',
    credit: 'NASA/JPL'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA00032/PIA00032~orig.jpg',
    planet: 'VENUS',
    caption: 'Magellan Radar Map',
    credit: 'NASA/JPL'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA02406/PIA02406~orig.jpg',
    planet: 'MARS',
    caption: 'Valles Marineris Hemisphere',
    credit: 'NASA/JPL'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg',
    planet: 'NEPTUNE',
    caption: 'Dark Spot Close-up',
    credit: 'NASA/JPL'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA00029/PIA00029~orig.jpg',
    planet: 'URANUS',
    caption: 'Miranda High Resolution',
    credit: 'NASA/JPL'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA00452/PIA00452~orig.jpg',
    planet: 'EARTH',
    caption: 'The Blue Marble',
    credit: 'NASA/Apollo 17'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA00405/PIA00405~orig.jpg',
    planet: 'MOON',
    caption: 'Lunar Surface Detail',
    credit: 'NASA/LRO'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA03154/PIA03154~orig.jpg',
    planet: 'SUN',
    caption: 'Solar Flare Eruption',
    credit: 'NASA/SOHO'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA19952/PIA19952~orig.jpg',
    planet: 'PLUTO',
    caption: 'The Heart of Pluto',
    credit: 'NASA/New Horizons'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA08653/PIA08653~orig.jpg',
    planet: 'NEBULA',
    caption: 'Orion Nebula',
    credit: 'NASA/Hubble'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA17563/PIA17563~orig.jpg',
    planet: 'NEBULA',
    caption: 'Crab Nebula Supernova Remnant',
    credit: 'NASA/Hubble'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA15415/PIA15415~orig.jpg',
    planet: 'GALAXY',
    caption: 'Andromeda Galaxy',
    credit: 'NASA/JPL-Caltech'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA04215/PIA04215~orig.jpg',
    planet: 'GALAXY',
    caption: 'Sombrero Galaxy',
    credit: 'NASA/Hubble'
  },
  {
    url: 'https://images-assets.nasa.gov/image/PIA23122/PIA23122~orig.jpg',
    planet: 'BLACK HOLE',
    caption: 'M87 Black Hole Shadow',
    credit: 'EHT Collaboration'
  }
]);

onMounted(async () => {
  const liveGallery = await fetchGallery();
  if (liveGallery && liveGallery.length > 0) {
    galleryImages.value = liveGallery as unknown as GalleryItem[];
  }
});
</script>
