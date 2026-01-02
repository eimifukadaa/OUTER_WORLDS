import { createDirectus, rest, staticToken, createPermission, readPermissions, deletePermission } from '@directus/sdk';

// Configuration
const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@outerworlds.space';
const ADMIN_PASSWORD = 'admin';

async function fixPermissions() {
  console.log('Starting Permissions Fix...');
  
  try {
    // 1. Authenticate
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
    console.log('Authenticated.');

    // 2. Init SDK
    const client = createDirectus(DIRECTUS_URL)
        .with(rest())
        .with(staticToken(token));

    // Also need access to directus_files for images
    const collections = ['planets', 'galleries', 'directus_files'];

    // 3. Fix Permissions
    for (const col of collections) {
        console.log(`Fixing permissions for "${col}"...`);
        
        // Find existing public permission
        let existing = [];
        try {
            existing = await client.request(readPermissions({
                filter: {
                    collection: { _eq: col },
                    role: { _null: true }
                }
            }));
            
            if (existing && existing.length > 0) {
                console.log(`Found ${existing.length} existing permission(s) for ${col}. Deleting...`);
                for (const perm of existing) {
                     await client.request(deletePermission(perm.id));
                }
            }
        } catch (e) {
            console.log(`Warning checking/deleting permissions for ${col}:`, e.message);
        }

        // Create new permission
        try {
            await client.request(createPermission({
                role: null, // Public
                collection: col,
                action: 'read',
                fields: ['*']
            }));
            console.log(`✅ Public read access ENABLED for ${col}`);
        } catch (e) {
            console.error(`❌ Failed to set permission for ${col}:`, e.message);
        }
    }

    console.log('Permissions update complete.');

  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

fixPermissions();
