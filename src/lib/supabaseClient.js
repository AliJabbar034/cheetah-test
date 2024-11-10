import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function checkSupabaseConnection() {
  try {
    console.log("Dara", supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from("survey_progress")
      .select("*")
      .limit(1);
    if (error) throw error;
    console.log("Successfully connected to Supabase.");
    return true;
  } catch (error) {
    console.error("Error connecting to Supabase:", error.message);
    return false;
  }
}
