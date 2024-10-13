import { createClient } from '@supabase/supabase-js';


const supabaseUrl = process.env.DATABASE_URL;
const supabaseAnonKey = process.env.ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function login(email, password) {
  try {
    const { user, session } = await supabase.auth.signIn({
      email,
      password,
    });
    console.log('Logged in:', user);
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
}

export { login };