<template>
  <div class="fixed inset-0 z-50 bg-black flex flex-col">
    <!-- Back Button -->
    <button 
      @click="$emit('close')" 
      class="absolute top-8 left-8 z-50 flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 hover:text-cosmic-cyan transition-all group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      <span class="font-mono text-sm tracking-widest uppercase">Back</span>
    </button>

    <!-- 3D Canvas -->
    <div ref="container" class="absolute inset-0 z-10">
      <canvas ref="canvas" class="block w-full h-full outline-none cursor-move"></canvas>
    </div>

    <!-- UI Overlay -->
    <div class="relative z-40 pointer-events-none w-full h-full flex flex-col justify-between p-6 md:p-12">
      
      <!-- Top Right: Info (Swapped position) -->
      <!-- Removed UUID display as requested -->

      <!-- Center Left: Title and Desc -->
      <div class="mt-40 md:mt-32 max-w-2xl pointer-events-auto"> <!-- Added more top margin and pointer-events-auto for text selection -->
        <!-- Removed Title Text -->
        <h1 class="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter shadow-black drop-shadow-lg">
          {{ planet.name.toUpperCase() }}
        </h1>
        <p class="text-gray-300 mt-6 text-base md:text-lg leading-relaxed glass-panel p-6 rounded-lg backdrop-blur-md border border-white/10 shadow-xl">
          {{ planet.description }}
        </p>
      </div>



      <!-- Bottom Right: Interact Hint -->
      <div class="self-end text-right">
        <div class="glass-panel px-6 py-4 rounded-xl border border-white/10 backdrop-blur-md flex flex-col items-center gap-2">
           <div class="flex gap-4 text-xs font-mono text-cosmic-cyan tracking-widest uppercase">
              <span>Rotate</span>
              <span>Zoom</span>
           </div>
           <div class="w-full h-px bg-white/20"></div>
           <p class="text-white text-sm">Interactive 3D Model</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import type { Planet } from '~/types/planet';

// ... (props and emits remain same)
const props = defineProps<{
  planet: Planet
}>();

const emit = defineEmits(['close']);

const container = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let animationFrameId: number;
let planetMesh: THREE.Mesh;
let atmosphereMesh: THREE.Mesh;

// ... (init remains same)
const init = () => {
    if (!canvas.value || !container.value) return;

    // SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050508);
    createStars();

    // CAMERA
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Start far away for zoom effect
    camera.position.set(0, 0, 100); 

    // RENDERER
    renderer = new THREE.WebGLRenderer({
      canvas: canvas.value,
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0x404040, 3); // More ambient 
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 5); // Bright sun
    sunLight.position.set(10, 5, 10); // Better angle
    scene.add(sunLight);
    
    // Backlight
    const backLight = new THREE.PointLight(props.planet.color, 2, 50);
    backLight.position.set(-5, 0, -5);
    scene.add(backLight);

    // PLANET
    createPlanet();
    
    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 20;

    // ANIMATION ENTRY
    gsap.to(camera.position, {
        z: 8,
        duration: 2.5,
        ease: "power3.out",
        onUpdate: () => { controls.update(); }
    });

    // RESIZE
    window.addEventListener('resize', handleResize);

    animate();
};

const createStars = () => {
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    
    for(let i=0; i<count*3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
}

// Reliable Texture Sources (GitHub Raw - CORS Friendly)
const PLANET_TEXTURES: Record<string, string> = {
    'mercury': 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/mercurymap.jpg',
    'venus': 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/venusmap.jpg',
    'earth': 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg', // User liked this one
    'mars': 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/marsmap1k.jpg',
    'jupiter': 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/jupitermap.jpg',
    'saturn': 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/saturnmap.jpg',
    'uranus': 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/uranusmap.jpg',
    'neptune': 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/neptunemap.jpg'
};

const PLANET_BUMPS: Record<string, string> = {
    'mercury': 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/mercurybump.jpg',
    'venus': 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/venusbump.jpg',
    'mars': 'https://raw.githubusercontent.com/jeromeetienne/threex.planets/master/images/marsbump1k.jpg',
};


const createPlanet = () => {
    // START PLANET CREATION
    // Core Sphere
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Material initial state: Color from props as fallback
    const material = new THREE.MeshStandardMaterial({
        color: props.planet.color, 
        roughness: 0.7,
        metalness: 0.1,
    });
    
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    // Force-load the correct texture based on name (Bypassing potential data props issues)
    const planetKey = props.planet.name.toLowerCase();
    const textureUrl = PLANET_TEXTURES[planetKey] || props.planet.texture_map;

    if (textureUrl) {
        textureLoader.load(
            textureUrl,
            (loadedTexture) => {
                loadedTexture.colorSpace = THREE.SRGBColorSpace;
                material.map = loadedTexture;
                material.color.setHex(0xffffff); // Reset color to white so texture shows true colors
                material.needsUpdate = true;
            },
            undefined,
            (err) => {
                console.warn(`Failed to load texture for ${planetKey}:`, err);
            }
        );
    }

    // Load Bump Map if available
    const bumpUrl = PLANET_BUMPS[planetKey];
    if (bumpUrl) {
        textureLoader.load(
            bumpUrl,
            (loadedBump) => {
                material.bumpMap = loadedBump;
                material.bumpScale = 0.02; // Subtle depth
                material.needsUpdate = true;
            }
        );
    }
    
    planetMesh = new THREE.Mesh(geometry, material);
    scene.add(planetMesh);

    // SPECIAL: Clouds for Earth
    if (planetKey === 'earth') {
        const cloudGeo = new THREE.SphereGeometry(2.02, 64, 64);
        const cloudMat = new THREE.MeshPhongMaterial({
            map: textureLoader.load('https://raw.githubusercontent.com/turban/webgl-earth/master/images/fair_clouds_4k.png'),
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });
        const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
        scene.add(cloudMesh);
        (planetMesh as any).cloudRef = cloudMesh; // Store for animation
    }

    // SATURN RINGS
    if (props.planet.name.toLowerCase() === 'saturn') {
        const innerRadius = 3;
        const outerRadius = 5.5;
        const ringGeo = new THREE.RingGeometry(innerRadius, outerRadius, 128); 
        
        const pos = ringGeo.attributes.position as THREE.BufferAttribute;
        const v3 = new THREE.Vector3();
        
        // Correct UV Mapping
        if (ringGeo.attributes.uv) {
            for (let i = 0; i < pos.count; i++){
                v3.fromBufferAttribute(pos, i);
                const u = (v3.x / outerRadius + 1) / 2;
                const v = (v3.y / outerRadius + 1) / 2;
                (ringGeo.attributes.uv as THREE.BufferAttribute).setXY(i, u, v);
            }
        }
        
        // Procedural Ring Texture (Simple Gradient)
        const ringTexture = createRingTexture();
        const ringMat = new THREE.MeshStandardMaterial({
            map: ringTexture,
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9, 
            roughness: 0.4,
            metalness: 0.2,
            blending: THREE.NormalBlending,
            depthWrite: true, // Fix for sorting artifacts: Force depth write
            alphaTest: 0.1 // Cutout low opacity to prevent square transparency artifacts if needed
        });

        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        
        // Tilt
        ringMesh.rotation.x = -Math.PI / 2 + (27 * Math.PI / 180); 
        
        scene.add(ringMesh);
        (planetMesh as any).ringRef = ringMesh; 
    }

    // Atmosphere Glow
    if (props.planet.name.toLowerCase() !== 'saturn') { 
        const atmoGeo = new THREE.SphereGeometry(2.1, 64, 64);
        const atmoMat = new THREE.MeshPhongMaterial({
            color: props.planet.color,
            transparent: true,
            opacity: 0.2, 
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending
        });
        atmosphereMesh = new THREE.Mesh(atmoGeo, atmoMat);
        scene.add(atmosphereMesh);
    }
}

// Procedural Ring Texture Generator
const createRingTexture = (): THREE.Texture => {
    if (typeof document === 'undefined') return new THREE.Texture();
    
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Radial Gradient for Rings
    const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius);
    
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.54, 'rgba(0,0,0,0)'); // Gap
    gradient.addColorStop(0.55, 'rgba(200, 180, 160, 0.2)'); // C Ring
    gradient.addColorStop(0.66, 'rgba(220, 200, 170, 0.9)'); // B Ring
    gradient.addColorStop(0.80, 'rgba(0,0,0,0)'); // Cassini Division
    gradient.addColorStop(0.82, 'rgba(200, 190, 170, 0.7)'); // A Ring
    gradient.addColorStop(1.0, 'rgba(0,0,0,0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0, canvas.width, canvas.height);
    
    // Add noise
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        if (data[i+3] > 0) {
            const noise = (Math.random() - 0.5) * 20;
            data[i] = Math.max(0, Math.min(255, data[i] + noise));
            data[i+1] = Math.max(0, Math.min(255, data[i+1] + noise));
            data[i+2] = Math.max(0, Math.min(255, data[i+2] + noise));
        }
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.center.set(0.5, 0.5); 
    return texture;
}

const handleResize = () => {
    if (!container.value || !camera || !renderer) return;
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};

const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    controls.update();
    
    // Slow rotation
    if(planetMesh) {
        planetMesh.rotation.y += 0.001;
        // Rotate rings if attached
        if ((planetMesh as any).ringRef) { // Fixed property name from ringMesh to ringRef
             (planetMesh as any).ringRef.rotation.z -= 0.0005; 
        }
        // Rotate clouds if attached
        if ((planetMesh as any).cloudRef) {
             (planetMesh as any).cloudRef.rotation.y += 0.0012; 
        }
    }
    if(atmosphereMesh) atmosphereMesh.rotation.y += 0.0011;

    renderer.render(scene, camera);
};

const destroy = () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);
    // Dispose resources to prevent leaks
    scene?.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (obj.material instanceof THREE.Material) {
                obj.material.dispose();
            }
        }
    });
    renderer?.dispose();
};

onMounted(() => {
    init();
});

onUnmounted(() => {
    destroy();
});
</script>

<style scoped>
.glass-panel {
    background: rgba(0, 0, 0, 0.6);
}
</style>
