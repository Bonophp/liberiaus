import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ksjqbxpbpivucybjlwid.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzanFieHBicGl2dWN5Ympsd2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzOTM2OTcsImV4cCI6MjA4Nzk2OTY5N30.o7tnMrb-WfNNE6YngmlLE4BQmLa7Jz3oKwGAwlNJg8c'

export const supabase = createClient(supabaseUrl, supabaseKey)