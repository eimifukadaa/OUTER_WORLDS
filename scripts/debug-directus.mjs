import { createDirectus, rest, authentication, readRoles, readPolicies } from '@directus/sdk';

// Configuration
const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@outerworlds.space';
const ADMIN_PASSWORD = 'admin';

async function debugDirectus() {
  console.log('Starting Directus Debug...');
  
  try {
    // 1. Init SDK with Authentication composable
    const client = createDirectus(DIRECTUS_URL)
        .with(authentication())
        .with(rest());

    // 2. Login
    console.log(`Logging in as ${ADMIN_EMAIL}...`);
    await client.login(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('Login successful.');

    // 3. Inspect Roles
    console.log('Fetching Roles...');
    try {
        const roles = await client.request(readRoles({ limit: -1 }));
        console.log('Roles found:', roles.length);
        roles.forEach(r => console.log(`- Role: ${r.name} (ID: ${r.id})`));
    } catch (e) {
        console.error('Failed to fetch roles:', e.message);
    }

    // 4. Inspect Policies
    console.log('Fetching Policies...');
    try {
        const policies = await client.request(readPolicies({ limit: -1 }));
        console.log('Policies found:', policies.length);
        policies.forEach(p => console.log(`- Policy: ${p.name} (ID: ${p.id})`));
    } catch (e) {
        console.error('Failed to fetch policies:', e.message);
    }

  } catch (err) {
    console.error('Fatal error:', err);
  }
}

debugDirectus();
