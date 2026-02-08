import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dqnlkdjmsdbizmxkbpqx.supabase.co"  // from Supabase dashboard
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbmxrZGptc2RiaXpteGticHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MzgzODAsImV4cCI6MjA3MTExNDM4MH0.ztOPrYJpexCr7SxRZw1AemW2T1I4AGbYvytlKjJoAJM"  // from Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
