const fetch = require('node-fetch'); // or global fetch in node 18+

// Config
const URL = 'http://localhost:8055';
const EMAIL = 'admin@outerworlds.space';
const PASS = 'admin';

async function main() {
    console.log('Force Public Access v2...');

    // 1. Auth
    const login = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email: EMAIL, password: PASS })
    });
    if(!login.ok) throw new Error('Login failed');
    const { data: { access_token } } = await login.json();
    const auth = { 'Authorization': `Bearer ${access_token}`, 'Content-Type': 'application/json' };
    console.log('Logged in.');

    // 2. Get Public Role
    const settingsRes = await fetch(`${URL}/settings`, { headers: auth });
    const settings = (await settingsRes.json()).data;
    let pubRole = settings.public_role;

    if (!pubRole) {
        console.log('No public_role set in settings. Searching "Public" role...');
        const rolesRes = await fetch(`${URL}/roles?filter[name][_eq]=Public`, { headers: auth });
        const roles = (await rolesRes.json()).data;
        if(roles.length > 0) {
            pubRole = roles[0].id;
        } else {
            console.log('Creating "Public" role...');
            const newRole = await fetch(`${URL}/roles`, {
                method: 'POST',
                headers: auth,
                body: JSON.stringify({ name: 'Public', icon: 'public' })
            });
            pubRole = (await newRole.json()).data.id;
        }
        // Save to settings
        await fetch(`${URL}/settings`, {
            method: 'PATCH', 
            headers: auth,
            body: JSON.stringify({ public_role: pubRole })
        });
        console.log('Updated settings with public_role:', pubRole);
    } else {
        console.log('Found public_role in settings:', pubRole);
    }

    // 3. Set Permissions (Planets, Galleries, Files)
    const collections = ['planets', 'galleries', 'directus_files'];
    
    for (const col of collections) {
        // Delete existing
        // Search permissions for this role & collection
        const existingRes = await fetch(`${URL}/permissions?filter[role][_eq]=${pubRole}&filter[collection][_eq]=${col}`, { headers: auth });
        const existing = (await existingRes.json()).data;
        
        for (const p of existing) {
            await fetch(`${URL}/permissions/${p.id}`, { method: 'DELETE', headers: auth });
        }
        
        // Crate new
        const create = await fetch(`${URL}/permissions`, {
            method: 'POST',
            headers: auth,
            body: JSON.stringify({
                role: pubRole,
                collection: col,
                action: 'read',
                fields: ['*']
            })
        });
        
        if(create.ok) console.log(`✅ Permission READ set for ${col}`);
        else console.log(`❌ Failed to set permission for ${col}:`, await create.text());
    }
}

main().catch(console.error);
