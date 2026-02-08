import { createClient } from '@supabase/supabase-js';

// TODO: Add your Supabase URL here
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'your_vite_supabase_url';
// TODO: Add your Supabase anon key here  
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'your_vite_supabase_anon_key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth helpers
export const auth = {
  signUp: async (email, password, options = {}) => {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: options?.metadata || {}
        }
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase?.auth?.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  },

  getSession: async () => {
    try {
      const { data, error } = await supabase?.auth?.getSession();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  getUser: async () => {
    try {
      const { data, error } = await supabase?.auth?.getUser();
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
};