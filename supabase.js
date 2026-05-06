// supabase.js — Client Supabase pour Study Vibes
// Remplace les deux valeurs ci-dessous par celles de ton projet Supabase :
// Dashboard → Settings → API

const SUPABASE_URL  = "https://mzidpnqykllspdgatgin.supabase.co";   // ex: https://abcdefgh.supabase.co
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16aWRwbnF5a2xsc3BkZ2F0Z2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzAxNzQsImV4cCI6MjA5MzY0NjE3NH0.3u7qG6wXl1CL75HWfVELqYLGbPqvUyrUCVSN4k9v5LI"; // commence par eyJ...

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
