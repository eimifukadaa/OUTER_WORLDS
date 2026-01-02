import { createDirectus, rest, staticToken, createCollection, createField, createItems, readCollections } from '@directus/sdk';

// Configuration
const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@outerworlds.space';
const ADMIN_PASSWORD = 'admin';

const planetsData = [
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
      featured_image: 'https://assets.science.nasa.gov/content/dam/science/psd/photojournal/pia/pia13/pia13840/PIA13840.jpg',
      image_credit: 'NASA/JHUAPL/Carnegie',
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
];

const galleryData = [
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
];

async function seed() {
  console.log('Starting Directus seeding...');
  
  try {
    // 1. Manually Login via fetch to get token
    console.log(`Authenticating as ${ADMIN_EMAIL}...`);
    const loginRes = await fetch(`${DIRECTUS_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    });
    
    if (!loginRes.ok) {
        throw new Error(`Login failed: ${loginRes.status} ${loginRes.statusText}`);
    }
    
    const loginData = await loginRes.json();
    const token = loginData.data.access_token;
    console.log('Authenticated. Token received.');

    // 2. Init SDK with token
    const client = createDirectus(DIRECTUS_URL)
        .with(rest())
        .with(staticToken(token));

    // 3. Create 'planets' collection
    console.log('Checking "planets" collection...');
    try {
        await client.request(createCollection({
            collection: 'planets',
            schema: {}, 
            meta: {
                singleton: false,
                sort: 'order',
                note: 'Planetary data'
            }
        }));
        console.log('Created "planets" collection.');
    } catch (e) {
        // Directus returns complex error objects, just checking safe failure
        console.log('Collection "planets" exists or error:', e.message);
    }

    // Fields for Planets
    const planetFields = [
        { name: 'uuid', type: 'uuid' },
        { name: 'name', type: 'string' },
        { name: 'slug', type: 'string' },
        { name: 'tagline', type: 'string' },
        { name: 'diameter', type: 'integer' },
        { name: 'atmosphere', type: 'string' },
        { name: 'avg_temperature', type: 'string' },
        { name: 'year_length', type: 'string' },
        { name: 'avg_distance_from_earth_km', type: 'bigInteger' },
        { name: 'travel_time_days', type: 'integer' },
        { name: 'travel_time_display', type: 'string' },
        { name: 'fun_fact', type: 'text' },
        { name: 'featured_image', type: 'string' },
        { name: 'image_credit', type: 'string' },
        { name: 'order', type: 'integer' },
        { name: 'color', type: 'string' }
    ];

    for (const f of planetFields) {
        try {
            await client.request(createField('planets', {
                field: f.name,
                type: f.type,
                meta: { interface: 'input', width: 'full' }
            }));
        } catch (e) {}
    }

    // Update planet data with UUIDs (using the same UUIDs as in usePlanets for consistency if running fresh, otherwise just let DB generate if omitted, but better to be explicit)
    // Actually, we need to inject UUIDs into the planetsData array in this script too.
    const enhancedPlanetsData = planetsData.map((p, index) => ({
        ...p,
        uuid: [
            'dcf8d8e3-5321-4d32-9382-74d324204523',
            '849c4501-c50d-4f79-8472-358055642a8b',
            'e713583a-f10e-4340-911d-231145100912',
            'c645e317-1065-4f32-8431-753174160431',
            'd7482312-3021-4321-8932-173821738123',
            'a8934123-4321-4091-8431-739182371239',
            'b7834912-4321-4091-8431-739182371239',
            'f2349123-4321-4091-8431-739182371239'
        ][index]
    }));

    // Insert Planets
    console.log('Inserting Planets...');
    const planetPayload = enhancedPlanetsData.map(({ id, ...rest }) => rest);
    try {
        await client.request(createItems('planets', planetPayload));
        console.log('Inserted planets.');
    } catch (e) {
        console.log('Error inserting planets:', e.message);
    }

    // --- GALLERIES ---
    console.log('Checking "galleries" collection...');
    try {
        await client.request(createCollection({
            collection: 'galleries',
            schema: {},
            meta: { singleton: false, note: 'Cosmic Gallery Images' }
        }));
        console.log('Created "galleries" collection.');
    } catch (e) {
         console.log('Collection "galleries" exists or error:', e.message);
    }

    // Fields for Galleries
    const galleryFields = [
        { name: 'url', type: 'string' }, 
        { name: 'planet', type: 'string' },
        { name: 'caption', type: 'string' },
        { name: 'credit', type: 'string' }
    ];

    for (const f of galleryFields) {
         try {
            await client.request(createField('galleries', {
                field: f.name,
                type: f.type,
                meta: { interface: 'input', width: 'full' }
            }));
        } catch (e) {}
    }

    // Insert Galleries
    console.log('Inserting 15 Gallery items...');
    try {
        await client.request(createItems('galleries', galleryData));
        console.log('Inserted gallery items.');
    } catch (e) {
         console.log('Error inserting gallery items:', e.message);
    }

    // --- PERMISSIONS (PUBLIC) ---
    console.log('Setting public permissions...');
    const collections = ['planets', 'galleries'];
    for (const col of collections) {
        try {
            await client.request(createItems('directus_permissions', {
                role: null, 
                collection: col,
                action: 'read',
                fields: ['*']
            }));
            console.log(`Public access enabled for ${col}`);
        } catch (e) {}
    }

    console.log('Seeding process finished successfully.');

  } catch (err) {
    console.error('Fatal seeding error:', err);
    process.exit(1);
  }
}

seed();
