import { createDirectus, rest, staticToken, createCollection, createField, createItems } from '@directus/sdk';

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@outerworlds.space';
const ADMIN_PASSWORD = 'admin';

async function init() {
  console.log('Starting Mars Mission Directus initialization...');
  
  try {
    const loginRes = await fetch(`${DIRECTUS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
    });
    
    if (!loginRes.ok) {
      throw new Error(`Login failed: ${loginRes.status}`);
    }
    
    const loginData = await loginRes.json();
    const token = loginData.data.access_token;

    const client = createDirectus(DIRECTUS_URL)
      .with(rest())
      .with(staticToken(token));

    console.log('Checking "mars_mission" collection...');
    try {
      await client.request(createCollection({
        collection: 'mars_mission',
        schema: {},
        meta: { singleton: true, note: 'Mars Countdown Mission Data' }
      }));
      console.log('Created "mars_mission" collection.');
    } catch (e) {
      console.log('Collection "mars_mission" likely exists.');
    }

    const fields = [
      { name: 'title', type: 'string' },
      { name: 'target_year', type: 'integer' },
      { name: 'label_text', type: 'string' },
      { name: 'content_text', type: 'text' }
    ];

    for (const f of fields) {
      try {
        await client.request(createField('mars_mission', {
          field: f.name,
          type: f.type,
          meta: { interface: f.type === 'text' ? 'textarea' : 'input' }
        }));
      } catch (e) {}
    }

    console.log('Seeding Mars Mission data...');
    try {
      await client.request(createItems('mars_mission', {
        title: 'FIRST CREWED MARS MISSION — COUNTDOWN',
        target_year: 2029,
        label_text: 'Estimated Launch Window for Humanity’s First Crewed Mars Mission',
        content_text: 'By 2029, humanity may attempt its most ambitious journey yet.\nNot exploration.\nNot visitation.\nBut survival beyond Earth.'
      }));
      console.log('Mission data seeded.');
    } catch (e) {
      console.log('Mission data likely already seeded.');
    }

    console.log('Enabling public access...');
    try {
      await client.request(createItems('directus_permissions', {
        role: null,
        collection: 'mars_mission',
        action: 'read',
        fields: ['*']
      }));
    } catch (e) {}

    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
  }
}

init();
