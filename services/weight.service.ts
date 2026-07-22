import { supabase } from "@/lib/supabase";

export type WeightEntry = {
  id: string;
  created_at: string;
  weight: number;
  user_id: string;
};

export async function getWeights() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Session:", session);

  if (!session) {
    throw new Error("Keine Session vorhanden");
  }

  const { data, error } = await supabase
    .from("weights")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as WeightEntry[];
}

export async function addWeight(weight: number) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Session:", session);

  if (!session) {
    throw new Error("Keine Session vorhanden");
  }

  const { error } = await supabase.from("weights").insert({
    weight,
    user_id: session.user.id,
  });

  if (error) {
    console.error(error);
    throw error;
  }
}