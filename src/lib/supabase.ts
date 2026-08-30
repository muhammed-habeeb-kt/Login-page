import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iaxonvaczopqwarvdntq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheG9udmFjem9wcXdhcnZkbnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NTY2NjQsImV4cCI6MjEwMzIzMjY2NH0.kCQUdKgUFUpEcypt1RemmeeFnIhZA5Vt697z_aOMEZ8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
