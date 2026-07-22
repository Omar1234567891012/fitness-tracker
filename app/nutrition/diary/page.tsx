"use client";

import { useEffect, useState } from "react";

import { MealType } from "@/services/meal-entry.service";
import { useNutritionDiary } from "@/app/hooks/useNutritionDiary";
import { getProfile, Profile } from "@/services/profile.service";

import NutritionSummary from "@/components/nutrition/NutritionSummary";
import NutritionGoals from "@/components/nutrition/NutritionGoals";
import MealCard from "@/components/nutrition/MealCard";
import FoodSelector from "@/components/nutrition/FoodSelector";

export default function NutritionDiaryPage() {
  const diary = useNutritionDiary();

  const [selectedMeal, setSelectedMeal] =
    useState<MealType | null>(null);

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();
  }, []);

  async function handleSave(
    foodId: string,
    amount: number
  ) {
    if (!selectedMeal) return;

    await diary.add(
      selectedMeal,
      foodId,
      amount
    );

    setSelectedMeal(null);
  }

  async function handleDelete(id: string) {
    try {
      await diary.remove(id);
    } catch (err) {
      console.error(err);
      alert("Eintrag konnte nicht gelöscht werden.");
    }
  }

  if (diary.loading) {
    return (
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold">
          Ernährungstagebuch
        </h1>

        <p className="mt-4">
          Lade Daten...
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto space-y-8 p-8">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Ernährungstagebuch
          </h1>

          <p className="mt-2 text-slate-400">
            Verwalte deine Mahlzeiten und behalte deine Makros im Blick.
          </p>

        </div>

        <input
          type="date"
          value={diary.date}
          onChange={(e) => diary.setDate(e.target.value)}
          className="rounded-lg bg-slate-900 p-3"
        />

      </div>

      <NutritionSummary
        calories={diary.summary.calories}
        protein={diary.summary.protein}
        carbs={diary.summary.carbs}
        fat={diary.summary.fat}
      />

      {profile && (
        <NutritionGoals
          calories={diary.summary.calories}
          protein={diary.summary.protein}
          carbs={diary.summary.carbs}
          fat={diary.summary.fat}
          calorieGoal={profile.calorie_goal ?? 2200}
          proteinGoal={profile.protein_goal ?? 180}
          carbsGoal={profile.carbs_goal ?? 250}
          fatGoal={profile.fat_goal ?? 70}
        />
      )}

      <MealCard
        title="🍳 Frühstück"
        entries={diary.breakfast}
        onAdd={() => setSelectedMeal("breakfast")}
        onDelete={handleDelete}
      />

      <MealCard
        title="🥗 Mittagessen"
        entries={diary.lunch}
        onAdd={() => setSelectedMeal("lunch")}
        onDelete={handleDelete}
      />

      <MealCard
        title="🍝 Abendessen"
        entries={diary.dinner}
        onAdd={() => setSelectedMeal("dinner")}
        onDelete={handleDelete}
      />

      <MealCard
        title="🍎 Snacks"
        entries={diary.snacks}
        onAdd={() => setSelectedMeal("snack")}
        onDelete={handleDelete}
      />

      <FoodSelector
        open={selectedMeal !== null}
        onClose={() => setSelectedMeal(null)}
        onSave={handleSave}
      />

    </main>
  );
}