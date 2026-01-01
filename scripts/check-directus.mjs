import { createDirectus, rest, readItems } from '@directus/sdk';

async function checkDirectus() {
    console.log("Checking Directus connection...");
    const client = createDirectus('http://localhost:8055').with(rest());
    
    try {
        await client.request(readItems('directus_users', { limit: 1 }));
        console.log("SUCCESS: Directus is running and accessible.");
    } catch (error) {
        console.error("ERROR: Could not connect to Directus. Make sure Docker is running: 'docker-compose up -d'");
    }
}

checkDirectus();
