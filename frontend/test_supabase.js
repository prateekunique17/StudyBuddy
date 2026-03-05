import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log("URL:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSupabase() {
    const { data, error } = await supabase.from('ai_logs').select('*');
    if (error) {
        console.error("Error fetching ai_logs:", error);
    } else {
        console.log("ai_logs data:", data);
        console.log("Count:", data.length);
    }
}

testSupabase();
