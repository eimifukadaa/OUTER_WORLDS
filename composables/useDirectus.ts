import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';

export const useDirectus = () => {
  // Initialize Directus SDK
  // We assume default port 8055 from docker-compose
  const client = createDirectus('http://localhost:8055').with(rest());

  // Helper to fetch planets
  const fetchPlanets = async () => {
    try {
      return await client.request(readItems('planets', {
        sort: ['order']
      }));
    } catch (e) {
      console.warn('Directus connect failed, falling back to static data:', e);
      return null; // Return null to signal fallback usage if needed
    }
  };

  // Helper to fetch gallery
  const fetchGallery = async () => {
    try {
      return await client.request(readItems('galleries'));
    } catch (e) {
       console.warn('Directus gallery fetch failed:', e);
       return [];
    }
  }

  return {
    client,
    fetchPlanets,
    fetchGallery
  };
};
