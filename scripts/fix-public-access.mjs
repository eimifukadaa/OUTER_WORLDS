// Using global fetch
// const fetch = require('node-fetch');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'admin@outerworlds.space';
const ADMIN_PASSWORD = 'admin';

async function main() {
    console.log('[Fix Public Access] Starting...');

    try {
        // 1. Login
        const loginRes = await fetch(`${DIRECTUS_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        });
        
        if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.status}`);
        const { data: { access_token } } = await loginRes.json();
        console.log('✅ Authenticated');

        const headers = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        };

        // 2. Get Settings to find Public Role
        const settingsRes = await fetch(`${DIRECTUS_URL}/settings`, { headers });
        const settingsData = await settingsRes.json();
        let publicRoleId = settingsData.data.public_role;

        console.log(`Current Public Role ID: ${publicRoleId}`);

        if (!publicRoleId) {
            console.log('⚠️ No Public Role defined in settings. Checking if "Public" role exists...');
            // Check roles
            const rolesRes = await fetch(`${DIRECTUS_URL}/roles?filter[name][_eq]=Public`, { headers });
            const rolesData = await rolesRes.json();
            
            if (rolesData.data.length > 0) {
                publicRoleId = rolesData.data[0].id;
                console.log(`Found existing "Public" role: ${publicRoleId}`);
            } else {
                console.log('Creating new "Public" role...');
                const createRoleRes = await fetch(`${DIRECTUS_URL}/roles`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        name: 'Public',
                        icon: 'public',
                        description: 'Default role for unauthenticated users'
                    })
                });
                const createRoleData = await createRoleRes.json();
                publicRoleId = createRoleData.data.id;
                console.log(`Created "Public" role: ${publicRoleId}`);
            }

            // Update settings
            console.log('Updating Settings with new Public Role...');
            await fetch(`${DIRECTUS_URL}/settings`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ public_role: publicRoleId })
            });
        }

        // 3. Create/Find Policy "Public Read"
        console.log('Checking for "Public Read" Policy...');
        const policiesRes = await fetch(`${DIRECTUS_URL}/policies?filter[name][_eq]=Public Read`, { headers });
        const policiesData = await policiesRes.json();
        let policyId;

        if (policiesData.data && policiesData.data.length > 0) {
            policyId = policiesData.data[0].id;
            console.log(`Found existing Policy: ${policyId}`);
        } else {
            console.log('Creating "Public Read" Policy...');
            const createPolicyRes = await fetch(`${DIRECTUS_URL}/policies`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    name: 'Public Read',
                    icon: 'public',
                    description: 'Read access for public collections'
                })
            });
            const createPolicyData = await createPolicyRes.json();
            policyId = createPolicyData.data.id;
            console.log(`Created Policy: ${policyId}`);
        }

        // 4. Update Permissions for this Policy
        // We want read access to 'planets', 'galleries', 'directus_files'
        const collections = ['planets', 'galleries', 'directus_files'];
        
        for (const collection of collections) {
            // Check if permission exists for this policy
            const permRes = await fetch(`${DIRECTUS_URL}/permissions?filter[policy][_eq]=${policyId}&filter[collection][_eq]=${collection}`, { headers });
            const permData = await permRes.json();
            
            if (permData.data.length === 0) {
                console.log(`Adding permission for ${collection}...`);
                await fetch(`${DIRECTUS_URL}/permissions`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        policy: policyId,
                        collection: collection,
                        action: 'read',
                        fields: ['*']
                    })
                });
            } else {
                console.log(`Permission for ${collection} already exists.`);
            }
        }

        // 5. Link Policy to Public Role (via directus_access)
        // Check if link exists
        const accessRes = await fetch(`${DIRECTUS_URL}/access?filter[role][_eq]=${publicRoleId}&filter[policy][_eq]=${policyId}`, { headers });
        const accessData = await accessRes.json();

        if (accessData.data.length === 0) {
            console.log('Linking Policy to Public Role...');
            await fetch(`${DIRECTUS_URL}/access`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    role: publicRoleId,
                    policy: policyId
                })
            });
        } else {
            console.log('Policy already linked to Role.');
        }

        console.log('✅ Success! Public access configured.');

    } catch (e) {
        console.error('❌ Error:', e);
    }
}

main();
