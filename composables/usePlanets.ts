import type { Planet } from '~/types/planet';

export const usePlanets = () => {
  const { fetchPlanets } = useDirectus();
  
  const planets = ref<Planet[]>([
    {
      id: 'mercury',
      name: 'MERCURY',
      slug: 'mercury',
      tagline: 'THE SWIFT PLANET',
      diameter: 4879,
      atmosphere: 'Thin (Oxygen, Sodium, Hydrogen)',
      avg_temperature: '-180°C to 430°C',
      year_length: '88 Earth Days',
      avg_distance_from_earth_km: 77000000,
      travel_time_days: 40,
      travel_time_display: '40 DAYS',
      fun_fact: 'Mercury is shrinking! It gets smaller as its iron core cools.',
      featured_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/600px-Mercury_in_true_color.jpg',
      image_credit: 'NASA/JPL/Messenger',
      order: 1,
      color: '#A5A5A5'
    },
    {
      id: 'venus',
      name: 'VENUS',
      slug: 'venus',
      tagline: 'EARTH\'S EVIL TWIN',
      diameter: 12104,
      atmosphere: 'Thick (Carbon Dioxide, Nitrogen)',
      avg_temperature: '462°C',
      year_length: '225 Earth Days',
      avg_distance_from_earth_km: 41000000,
      travel_time_days: 109,
      travel_time_display: '3.5 MONTHS',
      fun_fact: 'A day on Venus is longer than a year on Venus due to slow rotation.',
      featured_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/600px-Venus-real_color.jpg',
      image_credit: 'NASA/JPL',
      order: 2,
      color: '#E3BB76'
    },
    {
      id: 'earth',
      name: 'EARTH',
      slug: 'earth',
      tagline: 'THE PALE BLUE DOT',
      diameter: 12742,
      atmosphere: 'Nitrogen, Oxygen',
      avg_temperature: '15°C',
      year_length: '365.25 Days',
      avg_distance_from_earth_km: 0,
      travel_time_days: 0,
      travel_time_display: 'ORIGIN',
      fun_fact: 'Earth is the only known planet to have active plate tectonics.',
      featured_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/600px-The_Earth_seen_from_Apollo_17.jpg',
      image_credit: 'NASA/Apollo 17',
      order: 3,
      color: '#22A6B3'
    },
    {
      id: 'mars',
      name: 'MARS',
      slug: 'mars',
      tagline: 'THE RED PLANET',
      diameter: 6779,
      atmosphere: 'Thin (Carbon Dioxide)',
      avg_temperature: '-63°C',
      year_length: '687 Earth Days',
      avg_distance_from_earth_km: 78000000,
      travel_time_days: 200,
      travel_time_display: '7 MONTHS',
      fun_fact: 'Mars has the largest volcano in the solar system, Olympus Mons.',
      featured_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg',
      image_credit: 'ESA/OSIRIS',
      order: 4,
      color: '#D14B2B'
    },
    {
      id: 'jupiter',
      name: 'JUPITER',
      slug: 'jupiter',
      tagline: 'KING of PLANETS',
      diameter: 139820,
      atmosphere: 'Hydrogen, Helium',
      avg_temperature: '-108°C',
      year_length: '11.86 Earth Years',
      avg_distance_from_earth_km: 628000000,
      travel_time_days: 1800,
      travel_time_display: '5 YEARS',
      fun_fact: 'Jupiter\'s Great Red Spot is a storm bigger than Earth that has raged for centuries.',
      featured_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter.jpg/600px-Jupiter.jpg',
      image_credit: 'NASA/Cassini',
      order: 5,
      color: '#C88B3A'
    },
    {
      id: 'saturn',
      name: 'SATURN',
      slug: 'saturn',
      tagline: 'THE JEWEL OF THE SYSTEM',
      diameter: 116460,
      atmosphere: 'Hydrogen, Helium',
      avg_temperature: '-139°C',
      year_length: '29.45 Earth Years',
      avg_distance_from_earth_km: 1275000000,
      travel_time_days: 2500,
      travel_time_display: '7 YEARS',
      fun_fact: 'Saturn could float in water because its density is lower than water.',
      featured_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/600px-Saturn_during_Equinox.jpg',
      image_credit: 'NASA/Cassini',
      order: 6,
      color: '#C5AB6E'
    },
    {
      id: 'uranus',
      name: 'URANUS',
      slug: 'uranus',
      tagline: 'SIDEWAYS ICE GIANT',
      diameter: 50724,
      atmosphere: 'Hydrogen, Helium, Methane',
      avg_temperature: '-195°C',
      year_length: '84 Earth Years',
      avg_distance_from_earth_km: 2720000000,
      travel_time_days: 5500,
      travel_time_display: '15 YEARS',
      fun_fact: 'Uranus rotates on its side, rolling around the sun like a ball.',
      featured_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/600px-Uranus2.jpg',
      image_credit: 'NASA/Voyager 2',
      order: 7,
      color: '#4FD0E7'
    },
    {
      id: 'neptune',
      name: 'NEPTUNE',
      slug: 'neptune',
      tagline: 'THE WINDY GIANT',
      diameter: 49244,
      atmosphere: 'Hydrogen, Helium, Methane',
      avg_temperature: '-201°C',
      year_length: '164.8 Earth Years',
      avg_distance_from_earth_km: 4350000000,
      travel_time_days: 8500,
      travel_time_display: '23 YEARS',
      fun_fact: 'Neptune has supersonic winds that can reach 1,300 mph (2,100 km/h).',
      featured_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/600px-Neptune_Full.jpg',
      image_credit: 'NASA/Voyager 2',
      order: 8,
      color: '#3E54E8'
    }
  ]);

  // Hydrate with live data on client side
  onMounted(async () => {
    const liveData = await fetchPlanets();
    if (liveData && liveData.length > 0) {
      // Map Directus fields if necessary, or assume schema match
      // Our seed script matched the schema exactly.
      planets.value = liveData as Planet[];
    }
  });

  return {
    planets
  }
}
