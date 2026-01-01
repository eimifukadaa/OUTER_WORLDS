export interface Planet {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  diameter: number; // km
  atmosphere: string;
  avg_temperature: string;
  year_length: string;
  avg_distance_from_earth_km: number;
  travel_time_days: number;
  travel_time_display: string;
  fun_fact: string;
  featured_image: string;
  image_credit: string;
  order: number;
  color: string; // Hex for 3D representation
  texture_map?: string; // Path to texture
}

export interface GalleryItem {
  id?: string; // Optional because static data might not have it
  planet: string;
  url: string;
  caption: string;
  credit: string;
}
