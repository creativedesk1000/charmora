const { Client } = require('pg');

const connectionString = "postgresql://postgres.opfaxotdajkhrhhzqvxk:Charm2026passwor@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

async function test() {
    const client = new Client({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log("Connecting to Supabase Pooler...");
        await client.connect();
        console.log("SUCCESS: Connected!");
        const res = await client.query('SELECT NOW()');
        console.log("Server time:", res.rows[0]);
        await client.end();
    } catch (err) {
        console.error("CONNECTION FAILED:", err.message);
        if (err.detail) console.error("DETAIL:", err.detail);
        if (err.code) console.error("CODE:", err.code);
    }
}

test();
