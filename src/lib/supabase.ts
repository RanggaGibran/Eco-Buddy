import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hgfunzgapbfqfypcrhlb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZnVuemdhcGJmcWZ5cGNyaGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MzIxNzYsImV4cCI6MjA2NDQwODE3Nn0.tKEMErobfBkZjcIPo5xz8dFa5kRypMBiZOPFFqYgXfc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);