const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const userId = '755ff54a-1edd-4425-b94d-fde30af5c779'; // User ID from previous logs

async function makeAdmin() {
    console.log(`Promoting user ${userId} to admin...`);

    const { data, error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId)
        .select();

    if (error) {
        console.error('Error updating profile:', error.message);
    } else {
        console.log('Success! User is now an admin:', data);
    }
}

makeAdmin();
