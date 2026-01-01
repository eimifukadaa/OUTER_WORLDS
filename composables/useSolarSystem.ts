import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // Explicit extension often helps
import type { Planet } from '~/types/planet';
import { type Ref } from 'vue';
import { gsap } from 'gsap';

export const useSolarSystem = (canvasRef: Ref<HTMLCanvasElement | null>, containerRef: Ref<HTMLElement | null>, planets: Ref<Planet[]>) => {
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let controls: OrbitControls;
  let animationFrameId: number;
  
  // Store mesh references to animate them
  const planetMeshes: { [key: string]: THREE.Mesh } = {};
  const orbitMeshes: THREE.Line[] = [];

  const init = () => {
    if (!canvasRef.value || !containerRef.value) return;

    // SCENE
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0000025);

    // CAMERA
    const width = containerRef.value.clientWidth;
    const height = containerRef.value.clientHeight;
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000000);
    camera.position.set(0, 200, 500);

    // RENDERER
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 50;
    controls.maxDistance = 2000;
    controls.enablePan = false;

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xFFFFFF, 2, 3000);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // SUN
    const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFAA00 }); 
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    
    // Sun Glow
    const sunGlowGeo = new THREE.SphereGeometry(22, 32, 32);
    const sunGlowMat = new THREE.MeshBasicMaterial({ 
        color: 0xFFDD44, 
        transparent: true, 
        opacity: 0.4,
        side: THREE.BackSide 
    });
    const sunGlow = new THREE.Mesh(sunGlowGeo, sunGlowMat);
    sun.add(sunGlow);
    
    scene.add(sun);

    // STARS BACKGROUND
    createStars();

    // PLANETS
    createPlanets(planets.value);

    // Initial resize
    handleResize();
    window.addEventListener('resize', handleResize);

    animate();
  };

  const createStars = () => {
      const startGeometry = new THREE.BufferGeometry();
      const startCount = 10000;
      const posArray = new Float32Array(startCount * 3);
      
      for(let i = 0; i < startCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 4000; 
      }
      
      startGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const starMaterial = new THREE.PointsMaterial({
          size: 0.8,
          color: 0xffffff,
          transparent: true,
          opacity: 0.8,
          sizeAttenuation: true
      });
      
      const starMesh = new THREE.Points(startGeometry, starMaterial);
      scene.add(starMesh);
  }

  const createPlanets = (planetData: Planet[]) => {
      planetData.forEach((planet, index) => {
          // Scale factor for visualization
          const distanceScale = 40 + (index * 30); 
          const sizeScale = Math.max(1, planet.diameter / 5000);
          
          // Planet Mesh
          const geometry = new THREE.SphereGeometry(sizeScale, 32, 32);
          const material = new THREE.MeshStandardMaterial({ 
              color: planet.color,
              roughness: 0.7,
              metalness: 0.1
          });
          
          const mesh = new THREE.Mesh(geometry, material);
          
          // Random starting angle
          const angle = Math.random() * Math.PI * 2;
          mesh.position.x = Math.cos(angle) * distanceScale;
          mesh.position.z = Math.sin(angle) * distanceScale;
          
          // Store data in mesh for updates
          mesh.userData = {
              distance: distanceScale,
              angle: angle,
              speed: 0.005 / (index + 1)
          };
          
          scene.add(mesh);
          planetMeshes[planet.id] = mesh;

          // Orbit Line
          const orbitCurve = new THREE.EllipseCurve(
            0, 0,
            distanceScale, distanceScale,
            0, 2 * Math.PI,
            false,
            0
          );
          const points = orbitCurve.getPoints(100);
          const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.3 });
          const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
          orbit.rotation.x = -Math.PI / 2;
          scene.add(orbit);
          orbitMeshes.push(orbit);
      });
  };

  const handleResize = () => {
    if (!renderer || !camera || !containerRef.value) return;
    
    const width = containerRef.value.clientWidth;
    const height = containerRef.value.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    
    if (controls) controls.update();
    
    // Animate Planets
    Object.values(planetMeshes).forEach(mesh => {
        const m = mesh as THREE.Mesh;
        m.userData.angle += m.userData.speed;
        m.position.x = Math.cos(m.userData.angle) * m.userData.distance;
        m.position.z = Math.sin(m.userData.angle) * m.userData.distance;
        m.rotation.y += 0.01;
    });

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  };

  const moveCameraToPlanet = (planetSlug: string | null) => {
    if (!camera || !controls) return;

    if (!planetSlug) {
        // Reset to full view
        gsap.to(camera.position, {
            x: 0,
            y: 200,
            z: 500,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => controls.update()
        });
        gsap.to(controls.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
            ease: "power2.inOut"
        });
        return; 
    }

    // Find mesh by slug (iterating planetMeshes which are keyed by ID, but we need slug match)
    // Optimization: Store mapping or iterate. Iterating is fine for 8 planets.
    let targetMesh: THREE.Mesh | null = null;
    
    // We need to find the ID that corresponds to the slug
    // But map keys are IDs (e.g. mercury-1).
    // We can rely on the fact that the slug is part of the ID or iterate logic.
    // Simpler: iterate planetMeshes values and check their userData or match ID.
    // Actually, planetMeshes keys are IDs. 
    // Let's passed in slug is 'mercury'. ID is 'mercury-1'.
    
    const targetKey = Object.keys(planetMeshes).find(key => key.includes(planetSlug));
    if (targetKey) {
        targetMesh = planetMeshes[targetKey];
    }

    if (targetMesh) {
        // Move camera near this mesh
        // We want to follow it? For now just move TO it.
        // Since planets move, we should ideally lock camera to it, but for smooth scroll demo, 
        // we can just zoom into its current approximated position.
        
        const offset = 40; // Zoom distance
        
        gsap.to(camera.position, {
            x: targetMesh.position.x + offset,
            y: targetMesh.position.y + 20,
            z: targetMesh.position.z + offset,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => controls.update()
        });
        
        gsap.to(controls.target, {
            x: targetMesh.position.x,
            y: targetMesh.position.y,
            z: targetMesh.position.z,
            duration: 1.5,
            ease: "power2.out"
        });
    }
  };

  const destroy = () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
  };

  return {
    init,
    destroy,
    moveCameraToPlanet,
    camera: () => camera, // Expose camera getter
    controls: () => controls 
  };
};
