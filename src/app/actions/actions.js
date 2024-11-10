import { supabase } from "@/lib/supabaseClient";

export async function submitSurvey(email) {
  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email." };
  }

  const { data, error } = await supabase
    .from("survey_progress")
    .select("step")
    .eq("email", email)
    .single();

  if (data && data.step) {
    return { step: data.step + 1 };
  } else {
    const { error: insertError } = await supabase
      .from("survey_progress")
      .insert([{ email, step: 1 }]);

    if (insertError) return { error: insertError.message };
    return { step: 2 };
  }
}

export async function updateSurveyStep(email, stepData) {
  const { error } = await supabase
    .from("survey_progress")
    .update(stepData)
    .eq("email", email);

  if (error) {
    console.error("Failed to update survey step:", error.message);
    return { error: error.message };
  }
  return { success: true };
}
