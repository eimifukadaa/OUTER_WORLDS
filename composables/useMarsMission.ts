import { readItems } from '@directus/sdk';
import type { MarsMission } from '~/types/mission';

export const useMarsMission = () => {
    const { client } = useDirectus();

    const mission = ref<MarsMission>({
        title: 'FIRST CREWED MARS MISSION — COUNTDOWN',
        target_year: 2029,
        label_text: 'Estimated Launch Window for Humanity’s First Crewed Mars Mission',
        content_text: 'By 2029, humanity may attempt its most ambitious journey yet.\nNot exploration.\nNot visitation.\nBut survival beyond Earth.'
    });

    onMounted(async () => {
        try {
            // Since it's a singleton (or we treat it as one), we read the first item
            // Or if using Directus singleton feature, it might be readSingleton
            // But based on my seeding script, it's a regular collection with one item
            const data = await client.request(readItems('mars_mission'));
            if (data && data.length > 0) {
                mission.value = data[0] as MarsMission;
            }
        } catch (e) {
            console.warn('Failed to fetch Mars mission data, using defaults:', e);
        }
    });

    return {
        mission
    };
};
