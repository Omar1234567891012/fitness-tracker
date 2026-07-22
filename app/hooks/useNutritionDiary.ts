"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MealEntry,
  MealType,
  getMealEntries,
  addMealEntry,
  deleteMealEntry,
  calculateNutrition,
} from "@/services/meal-entry.service";

function today() {
  return new Date().toISOString().split("T")[0];
}

export function useNutritionDiary() {
  const [date, setDate] = useState(today());

  const [entries, setEntries] = useState<MealEntry[]>([]);

  const [loading, setLoading] = useState(true);

  const loadEntries = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getMealEntries(date);
      setEntries(data);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  async function add(
    mealType: MealType,
    foodId: string,
    amount: number
  ) {
    await addMealEntry({
      mealType,
      foodId,
      amount,
      date,
    });

    await loadEntries();
  }

  async function remove(id: string) {
    await deleteMealEntry(id);
    await loadEntries();
  }

  const breakfast = useMemo(
    () =>
      entries.filter(
        (e) => e.meal_type === "breakfast"
      ),
    [entries]
  );

  const lunch = useMemo(
    () =>
      entries.filter(
        (e) => e.meal_type === "lunch"
      ),
    [entries]
  );

  const dinner = useMemo(
    () =>
      entries.filter(
        (e) => e.meal_type === "dinner"
      ),
    [entries]
  );

  const snacks = useMemo(
    () =>
      entries.filter(
        (e) => e.meal_type === "snack"
      ),
    [entries]
  );

  const summary = useMemo(
    () => calculateNutrition(entries),
    [entries]
  );

  return {
    loading,

    date,
    setDate,

    breakfast,
    lunch,
    dinner,
    snacks,

    summary,

    add,
    remove,

    reload: loadEntries,
  };
}