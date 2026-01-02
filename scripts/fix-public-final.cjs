const fetch = require('node-fetch');

const URL = 'http://localhost:8055';
const EMAIL = 'admin@outerworlds.space';
const PASS = 'admin';

async function main() {
    console.log('--- FINAL PUBLIC ACCESS FIX ---');

    // 1. Login
    console.log('Logging in...');
    const login = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email: EMAIL, password: PASS })
    });
    
    if(!login.ok) {
        console.error('Login failed:', await login.text());
        process.exit(1);
    }
    
    const { data: { access_token } } = await login.json();
    const auth = { 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json' };
    console.log('Logged in successfully.');

    // 2. Identify Public Role
    console.log('Checking Public Role...');
    let pubRoleId;
    const settingsRes = await fetch(`${URL}/settings`, { headers: auth });
    const settings = (await settingsRes.json()).data;
    
    if (settings.public_role) {
        pubRoleId = settings.public_role;
        console.log(`Public role already configured: ${pubRoleId}`);
    } else {
        console.log('No public role in settings. Finding or creating...');
        const rolesRes = await fetch(`${URL}/roles?filter[name][_eq]=Public`, { headers: auth });
        const roles = (await rolesRes.json()).data;
        
        if (roles.length > 0) {
            pubRoleId = roles[0].id;
        } else {
            const newRole = await fetch(`${URL}/roles`, {
                method: 'POST',
                headers: auth,
                body: JSON.stringify({ name: 'Public', icon: 'public', description: 'Public Access Role' })
            });
            pubRoleId = (await newRole.json()).data.id;
        }

        // Update settings
        await fetch(`${URL}/settings`, {
            method: 'PATCH',
            headers: auth,
            body: JSON.stringify({ public_role: pubRoleId })
        });
        console.log(`Set public role to: ${pubRoleId}`);
    }

    // 3. Clear existing permissions for this role to avoid conflicts
    console.log('Clearing old permissions for Public role...');
    // The previous request didn't fail, but let's be safer with empty array fallback.
    const existingPermsRes = await fetch(`${URL}/permissions?filter[role][_eq]=${pubRoleId}&limit=-1`, { headers: auth });
    const existingPermsJson = await existingPermsRes.json();
    const existingPerms = existingPermsJson.data || [];
    
    for (const p of existingPerms) {
        await fetch(`${URL}/permissions/${p.id}`, { method: 'DELETE', headers: auth });
    }
    console.log(`Deleted ${existingPerms.length} old permissions.`);

    // 4. Create new READ permissions
    const collections = ['planets', 'galleries', 'directus_files'];
    console.log(`Granting READ access to: ${collections.join(', ')}...`);

    for (const col of collections) {
        const res = await fetch(`${URL}/permissions`, {
            method: 'POST',
            headers: auth,
            body: JSON.stringify({
                role: pubRoleId,
                collection: col,
                action: 'read',
                fields: ['*']
            })
        });
        
        if (res.ok) console.log(`✅ READ enabled for ${col}`);
        else console.error(`❌ Failed ${col}:`, await res.text());
    }
    
    console.log('--- FIX COMPLETE ---');
}

main();
