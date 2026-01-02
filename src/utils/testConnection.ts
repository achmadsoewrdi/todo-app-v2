// src/utils/testConnection.ts
import { supabase } from '@/lib/supabase';

export const testSupabaseConnection = async () => {
  try {
    // Test 1: Check if client is initialized
    console.log('🔍 Testing Supabase connection...');
    
    // Test 2: Try to get session (will return null if no user logged in)
    const { error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session Error:', sessionError.message);
      return false;
    }
    
    console.log('✅ Session check passed');
    
    // Test 3: Try a simple query to todos table
    const { error } = await supabase
      .from('todos')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database Error:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful!');
    console.log('📊 Connection details:', {
      url: import.meta.env.VITE_SUPABASE_URL,
      hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
    });
    
    return true;
  } catch (err) {
    console.error('❌ Connection test failed:', err);
    return false;
  }
};
