import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted, onUnmounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (
  moveCameraToPlanet: (planetId: string | null) => void
) => {
  let triggers: ScrollTrigger[] = [];

  const initScroll = () => {
    // Initial State
    moveCameraToPlanet(null);

    // Create triggers for each planet section
    const sections = document.querySelectorAll('section[id^="mercury"], section[id^="venus"], section[id^="earth"], section[id^="mars"], section[id^="jupiter"], section[id^="saturn"], section[id^="uranus"], section[id^="neptune"]');
    
    sections.forEach((section) => {
      const id = section.id;
      // Find planet ID from slug (assuming ID format or simplified slug matching)
      // In our data: 'mercury-1' but slug is 'mercury'. The section ID uses the slug.
      // We need to map slug to ID or just search.
      
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
             // We need to find the full ID based on slug, logic handling in moveCameraToPlanet is better if it accepts slug too
             // For now passing slug and letting handle handle it
             moveCameraToPlanet(id);
        },
        onEnterBack: () => {
             moveCameraToPlanet(id);
        },
        onLeaveBack: () => {
            if (id === 'mercury') { // First planet
                moveCameraToPlanet(null); // Reset to overview
            }
        }
      });
      triggers.push(trigger);
    });
  };

  const destroyScroll = () => {
    triggers.forEach(t => t.kill());
    triggers = [];
  };

  return {
    initScroll,
    destroyScroll
  };
};
