<template>
  <section ref="sectionRef" id="mars-countdown" class="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-32 opacity-0">
    <!-- Star Background -->
    <div class="absolute inset-0 z-0">
      <div class="stars-container absolute inset-0 opacity-40"></div>
      <div class="orbital-lines absolute inset-0 opacity-10"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 text-center">
      <!-- Label Header -->
      <header class="mb-16">
        <h2 class="text-xs md:text-sm font-mono text-cosmic-cyan tracking-[0.4em] uppercase mb-4">
          {{ mission.label_text }}
        </h2>
        <h3 class="text-4xl md:text-7xl font-display font-bold text-white tracking-tight leading-none uppercase">
          {{ mission.title }}
        </h3>
      </header>

      <!-- Countdown Display -->
      <div class="flex flex-col items-center justify-center mb-20">
        <div class="text-[clamp(2.5rem,10vw,8rem)] font-mono font-bold text-white leading-none tracking-tighter flex items-center justify-center space-x-2 md:space-x-4">
          <span class="text-cosmic-detail opacity-50 text-[0.4em] mr-2 md:mr-4">T–</span>
          <div class="flex flex-col items-center">
            <span>{{ timeRemaining.years }}</span>
            <span class="text-[0.15em] font-sans tracking-[0.3em] uppercase text-cosmic-cyan">Years</span>
          </div>
          <span class="opacity-20">:</span>
          <div class="flex flex-col items-center">
            <span>{{ String(timeRemaining.days).padStart(3, '0') }}</span>
            <span class="text-[0.15em] font-sans tracking-[0.3em] uppercase text-cosmic-cyan">Days</span>
          </div>
          <span class="opacity-20">:</span>
          <div class="flex flex-col items-center">
            <span>{{ String(timeRemaining.hours).padStart(2, '0') }}</span>
            <span class="text-[0.15em] font-sans tracking-[0.3em] uppercase text-cosmic-cyan">Hrs</span>
          </div>
          <span class="opacity-20">:</span>
          <div class="flex flex-col items-center">
            <span>{{ String(timeRemaining.minutes).padStart(2, '0') }}</span>
            <span class="text-[0.15em] font-sans tracking-[0.3em] uppercase text-cosmic-cyan">Min</span>
          </div>
          <span class="opacity-20">:</span>
          <div class="flex flex-col items-center">
            <span>{{ String(timeRemaining.seconds).padStart(2, '0') }}</span>
            <span class="text-[0.15em] font-sans tracking-[0.3em] uppercase text-cosmic-cyan">Sec</span>
          </div>
        </div>
      </div>

      <!-- Content Copy -->
      <div class="max-w-2xl mx-auto">
        <p class="text-lg md:text-2xl text-gray-400 font-light leading-relaxed whitespace-pre-line">
          {{ mission.content_text }}
        </p>
      </div>

      <!-- Accent Line -->
      <div class="mt-24 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-cosmic-cyan to-transparent"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMarsMission } from '~/composables/useMarsMission';

gsap.registerPlugin(ScrollTrigger);

const { mission } = useMarsMission();
const sectionRef = ref<HTMLElement | null>(null);

const timeRemaining = ref({
  years: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});

const calculateCountdown = () => {
  // Target: January 1st of the target year
  const targetDate = new Date(mission.value.target_year, 0, 1);
  const now = new Date();
  
  let diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    timeRemaining.value = { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return;
  }

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;
  const yearsInMs = daysInMs * 365.25;

  const years = Math.floor(diff / yearsInMs);
  diff %= yearsInMs;

  const days = Math.floor(diff / daysInMs);
  diff %= daysInMs;

  const hours = Math.floor(diff / hoursInMs);
  diff %= hoursInMs;

  const minutes = Math.floor(diff / minutesInMs);
  diff %= minutesInMs;

  const seconds = Math.floor(diff / secondsInMs);

  timeRemaining.value = { years, days, hours, minutes, seconds };
};

let timer: ReturnType<typeof setInterval>;

onMounted(() => {
  calculateCountdown();
  timer = setInterval(calculateCountdown, 1000);

  // Scroll Animation
  if (sectionRef.value) {
    gsap.to(sectionRef.value, {
      opacity: 1,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Content subtle movement
    gsap.from(sectionRef.value.querySelector('.relative.z-10'), {
      y: 30,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.stars-container {
  background-image: 
    radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
    radial-gradient(1.5px 1.5px at 50px 160px, #fff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 80px 120px, #fff, rgba(0,0,0,0)),
    radial-gradient(1.5px 1.5px at 110px 210px, #fff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 150px 250px, #fff, rgba(0,0,0,0));
  background-size: 300px 300px;
  background-repeat: repeat;
}

.orbital-lines {
  background: radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(14, 165, 233, 0.1) 60%, rgba(14, 165, 233, 0.1) 61%, transparent 61%);
  background-size: 800px 800px;
  background-position: center;
}
</style>
