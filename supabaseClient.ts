import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ewdueeskbiwqcykgjmvm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZHVlZXNrYml3cWN5a2dqbXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NTA1NTcsImV4cCI6MjA4NjMyNjU1N30.F1hL_GKk4qV9vvXIGZ7pd6sQ0-_po5mzpGFM84Eyiv0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
