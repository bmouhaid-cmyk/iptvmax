const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing connection to:', supabaseUrl);

    // Try to select from profiles (should be readable by everyone)
    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

    if (profilesError) {
        console.error('Error connecting to profiles:', profilesError.message);
    } else {
        console.log('Successfully connected to profiles table.');
    }

    // Try to select from orders (might be empty or RLS restricted)
    const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('count')
        .limit(1);

    if (ordersError) {
        console.error('Error connecting to orders:', ordersError.message);
        if (ordersError.code === '42P01') {
            console.error('Table "orders" does not exist!');
        }
    } else {
        console.log('Successfully connected to orders table.');
    }
}

testConnection();
