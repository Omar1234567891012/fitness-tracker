import { supabase } from "@/lib/supabase";

export type Profile = {
  id: string;
  name: string | null;
  height: number | null;
  target_weight: number | null;
  avatar_url: string | null;

  calorie_goal: number | null;
  protein_goal: number | null;
  carbs_goal: number | null;
  fat_goal: number | null;
};

export async function getProfile(): Promise<Profile | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Keine Session vorhanden.");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function saveProfile(profile: {
  name: string;
  height: number;
  target_weight: number;

  calorie_goal: number;
  protein_goal: number;
  carbs_goal: number;
  fat_goal: number;
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Keine Session vorhanden.");

  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: session.user.id,

      name: profile.name,
      height: profile.height,
      target_weight: profile.target_weight,

      calorie_goal: profile.calorie_goal,
      protein_goal: profile.protein_goal,
      carbs_goal: profile.carbs_goal,
      fat_goal: profile.fat_goal,
    });

  if (error) throw error;
}