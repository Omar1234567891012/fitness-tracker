import { supabase } from "@/lib/supabase";

export type MealType =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snack";

type Food = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type MealEntry = {
  id: string;
  amount: number;
  consumed_at: string;
  meal_type: MealType;
  food: Food;
};

export async function getMealEntries(
  date: string
): Promise<MealEntry[]> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Keine Session.");
  }

  const { data, error } = await supabase
    .from("meal_entries")
    .select(`
      id,
      amount,
      consumed_at,
      meal_type,
      food:foods(
        id,
        name,
        calories,
        protein,
        carbs,
        fat
      )
    `)
    .eq("user_id", session.user.id)
    .eq("consumed_at", date)
    .order("created_at", { ascending: true });

  if (error) throw error;

  const entries: MealEntry[] = (data ?? []).map((entry: any) => ({
    id: entry.id,
    amount: entry.amount,
    consumed_at: entry.consumed_at,
    meal_type: entry.meal_type,
    food: Array.isArray(entry.food)
      ? entry.food[0]
      : entry.food,
  }));

  return entries;
}

export async function addMealEntry({
  foodId,
  amount,
  mealType,
  date,
}: {
  foodId: string;
  amount: number;
  mealType: MealType;
  date: string;
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Keine Session.");
  }

  const { error } = await supabase
    .from("meal_entries")
    .insert({
      user_id: session.user.id,
      food_id: foodId,
      amount,
      meal_type: mealType,
      consumed_at: date,
    });

  if (error) throw error;
}

export async function deleteMealEntry(id: string) {
  const { error } = await supabase
    .from("meal_entries")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function updateMealAmount(
  id: string,
  amount: number
) {
  const { error } = await supabase
    .from("meal_entries")
    .update({ amount })
    .eq("id", id);

  if (error) throw error;
}

export function calculateNutrition(entries: MealEntry[]) {
  return entries.reduce(
    (total, entry) => {
      const factor = entry.amount / 100;

      total.calories += entry.food.calories * factor;
      total.protein += entry.food.protein * factor;
      total.carbs += entry.food.carbs * factor;
      total.fat += entry.food.fat * factor;

      return total;
    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  );
}