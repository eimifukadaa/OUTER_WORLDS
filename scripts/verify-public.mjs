// verify-public.mjs
const DIRECTUS_URL = 'http://localhost:8055';

async function verify() {
    console.log('Verifying public access to planets...');
    try {
        const res = await fetch(`${DIRECTUS_URL}/items/planets?limit=1`);
        if (res.ok) {
            const data = await res.json();
            console.log('✅ Success! Public can access planets.');
            console.log('Sample:', data.data?.[0]?.name);
        } else {
            console.log(`❌ Failed: ${res.status} ${res.statusText}`);
            const text = await res.text();
            console.log('Response:', text);
        }
    } catch (e) {
        console.log('❌ Connection failed:', e.message);
    }
}

verify();
