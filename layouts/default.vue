<template>
  <div class="min-h-screen bg-space-black text-white selection:bg-cosmic-cyan selection:text-space-black relative">
    <header class="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
      <nav class="flex justify-between items-center max-w-7xl mx-auto">
        <div class="logo font-display font-bold text-2xl tracking-tighter">
          EARTH <span class="text-cosmic-cyan">→</span> OUTER WORLDS
        </div>
        <div class="hidden md:flex space-x-8 font-mono text-sm opacity-80">
          <a href="#solar-system" class="hover:text-cosmic-cyan transition-colors">SOLAR SYSTEM</a>
          <a href="#mission" class="hover:text-cosmic-cyan transition-colors">MISSION</a>
          <a href="#gallery" class="hover:text-cosmic-cyan transition-colors">GALLERY</a>
        </div>
      </nav>
    </header>

    <main>
      <slot />
    </main>

    <footer class="bg-space-void border-t border-white/5 py-12 mt-20">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="font-display text-xl mb-4">EARTH → OUTER WORLDS</h3>
          <p class="text-gray-400 max-w-md font-light">
            A digital museum exhibition exploring the real scale of our solar system and the human endeavor to reach beyond.
          </p>
        </div>
        <div class="text-right font-mono text-xs text-gray-500 flex flex-col justify-end">
          <p>DATA SOURCE: NASA INTERACTIVE API</p>
          <p>IMAGES: NASA / JPL-CALTECH / ESA</p>
          <p class="mt-2">EST. 2026</p>
        </div>
      </div>
    </footer>
  </div>
</template>
