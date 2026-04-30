import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/['"]+/g, '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").replace(/['"]+/g, '').trim();
const supabaseServiceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").replace(/['"]+/g, '').trim();

// Use Service Role Key on server if available for full access
const supabaseKey = (typeof window === 'undefined' && supabaseServiceKey) 
    ? supabaseServiceKey 
    : supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
