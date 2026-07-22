import { supabase } from "@/lib/supabase";

export type Food = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export async function getFoods(): Promise<Food[]> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Keine Session.");

  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .eq("user_id", session.user.id)
    .order("name");

  if (error) throw error;

  return data ?? [];
}

export async function addFood(food: {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("Keine Session.");

  const { error } = await supabase.from("foods").insert({
    user_id: session.user.id,
    ...food,
  });

  if (error) throw error;
}