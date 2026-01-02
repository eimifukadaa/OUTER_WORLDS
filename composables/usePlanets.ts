import type { Planet } from '~/types/planet';

export const usePlanets = () => {
  const { fetchPlanets } = useDirectus();
  
  const planets = ref<Planet[]>([
    {
      id: 'mercury',
      uuid: 'dcf8d8e3-5321-4d32-9382-74d324204523',
      name: 'MERCURY',
      slug: 'mercury',
      tagline: 'THE SWIFT PLANET',
      description: 'Mercury is the smallest planet in our solar system and closest to the Sun. It is only slightly larger than Earth\'s Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.',
      diameter: 4879,
      atmosphere: 'Thin (Oxygen, Sodium, Hydrogen)',
      avg_temperature: '-180°C to 430°C',
      year_length: '88 Earth Days',
      avg_distance_from_earth_km: 77000000,
      travel_time_days: 40,
      travel_time_display: '40 DAYS',
      fun_fact: 'Mercury is shrinking! It gets smaller as its iron core cools.',
      featured_image: 'https://cdn.mos.cms.futurecdn.net/fjbeeRiPRQjQNhizwy7cWX-1024-80.jpg',
      image_credit: 'NASA/JPL/Messenger',
      order: 1,
      color: '#A5A5A5',
      texture_map: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/mercury-1024.jpg'
    },
    {
      id: 'venus',
      uuid: '849c4501-c50d-4f79-8472-358055642a8b',
      name: 'VENUS',
      slug: 'venus',
      tagline: 'EARTH\'S EVIL TWIN',
      description: 'Venus spins slowly in the opposite direction from most planets. Its thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.',
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
      color: '#E3BB76',
      texture_map: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/venus-1024.jpg'
    },
    {
      id: 'earth',
      uuid: 'e713583a-f10e-4340-911d-231145100912',
      name: 'EARTH',
      slug: 'earth',
      tagline: 'THE PALE BLUE DOT',
      description: 'Earth is our home planet. It is the only place we know of so far that\'s inhabited by living things. It\'s also the only planet in our solar system with liquid water on the surface.',
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
      color: '#22A6B3',
      texture_map: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg'
    },
    {
      id: 'mars',
      uuid: 'c645e317-1065-4f32-8431-753174160431',
      name: 'MARS',
      slug: 'mars',
      tagline: 'THE RED PLANET',
      description: 'Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence that Mars was – billions of years ago – wetter and warmer, with a thick atmosphere.',
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
      color: '#D14B2B',
      texture_map: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/mars-1024.jpg'
    },
    {
      id: 'jupiter',
      uuid: 'd7482312-3021-4321-8932-173821738123',
      name: 'JUPITER',
      slug: 'jupiter',
      tagline: 'KING of PLANETS',
      description: 'Jupiter is more than twice as massive as all the other planets combined. The giant planet\'s Great Red Spot is a centuries-old storm bigger than Earth.',
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
      color: '#C88B3A',
      texture_map: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/jupiter-1024.jpg'
    },
    {
      id: 'saturn',
      uuid: 'a8934123-4321-4091-8431-739182371239',
      name: 'SATURN',
      slug: 'saturn',
      tagline: 'THE JEWEL OF THE SYSTEM',
      description: 'Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn\'s.',
      diameter: 116460,
      atmosphere: 'Hydrogen, Helium',
      avg_temperature: '-139°C',
      year_length: '29.45 Earth Years',
      avg_distance_from_earth_km: 1275000000,
      travel_time_days: 2500,
      travel_time_display: '7 YEARS',
      fun_fact: 'Saturn could float in water because its density is lower than water.',
      featured_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1280px-Saturn_during_Equinox.jpg',
      image_credit: 'NASA/Voyager 2',
      order: 6,
      color: '#E3CD94',
      texture_map: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/saturn-1024.jpg'
    },
    {
      id: 'uranus',
      uuid: 'b7834912-4321-4091-8431-739182371239',
      name: 'URANUS',
      slug: 'uranus',
      tagline: 'SIDEWAYS ICE GIANT',
      description: 'Uranus is the seventh planet from the Sun, and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope, uranium was named after it.',
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
      color: '#4FD0E7',
      texture_map: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/uranus-1024.jpg'
    },
    {
      id: 'neptune',
      uuid: 'f2349123-4321-4091-8431-739182371239',
      name: 'NEPTUNE',
      slug: 'neptune',
      tagline: 'THE WINDY GIANT',
      description: 'Dark, cold and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system. It is the only planet in our solar system not visible to the naked eye.',
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
      color: '#3E54E8',
      texture_map: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/neptune-1024.jpg'
    }
  ]);

  // Hydrate with live data on client side
  // Hydrate with live data on client side, but preserve local textures if missing in DB
  onMounted(async () => {
    try {
      const liveData = await fetchPlanets();
      if (liveData && liveData.length > 0) {
        // Merge strategy: Use live data, but fallback to local textures/images if missing in DB
        const mergedData = liveData.map((livePlanet: any) => {
          const localPlanet = planets.value.find(p => p.id === livePlanet.id || p.slug === livePlanet.slug);
          
          return {
            ...livePlanet,
            // Keep local texture if DB texture is missing/empty
            texture_map: livePlanet.texture_map || (localPlanet ? localPlanet.texture_map : null),
            // Keep local featured_image if DB one is missing/empty
            featured_image: livePlanet.featured_image || (localPlanet ? localPlanet.featured_image : null),
            // Ensure color is present
            color: livePlanet.color || (localPlanet ? localPlanet.color : '#FFFFFF')
          } as Planet;
        });
        
        planets.value = mergedData;
      }
    } catch (e) {
      console.error("Failed to fetch live planets, using local data", e);
    }
  });

  return {
    planets
  }
}
