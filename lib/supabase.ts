import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://woqchgyedjremgfxezkj.supabase.co' // ← remplace ici
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvcWNoZ3llZGpyZW1nZnhlemtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MjUwOTUsImV4cCI6MjA1OTAwMTA5NX0.JiMVp4VKqn8sbF1LPvtg6EEdTBYNjh1kZfyf4TVmRgg' // ← remplace ici

export const supabase = createClient(supabaseUrl, supabaseKey)
