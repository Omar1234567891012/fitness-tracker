"use client";

import { useEffect, useState } from "react";
import { addFood, getFoods, Food } from "@/services/food.service";

export default function NutritionPage() {
  const [foods, setFoods] = useState<Food[]>([]);

  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFoods();
  }, []);

  async function loadFoods() {
    try {
      const data = await getFoods();
      setFoods(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function saveFood() {
    if (!name.trim()) {
      alert("Bitte einen Namen eingeben.");
      return;
    }

    setLoading(true);

    try {
      await addFood({
        name,
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
      });

      setName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFat("");

      await loadFoods();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto space-y-8">

      <h1 className="text-4xl font-bold">
        Ernährung
      </h1>

      <div className="rounded-xl bg-slate-900 p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Neues Lebensmittel
        </h2>

        <div className="grid md:grid-cols-5 gap-4">

          <input
            placeholder="Name"
            className="rounded-lg bg-slate-800 p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Kalorien"
            type="number"
            className="rounded-lg bg-slate-800 p-3"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />

          <input
            placeholder="Protein"
            type="number"
            className="rounded-lg bg-slate-800 p-3"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />

          <input
            placeholder="Kohlenhydrate"
            type="number"
            className="rounded-lg bg-slate-800 p-3"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />

          <input
            placeholder="Fett"
            type="number"
            className="rounded-lg bg-slate-800 p-3"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
          />

        </div>

        <button
          onClick={saveFood}
          disabled={loading}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
        >
          {loading ? "Speichern..." : "Lebensmittel speichern"}
        </button>

      </div>

      <div className="rounded-xl bg-slate-900 p-6">

        <h2 className="text-2xl font-semibold mb-6">
          Meine Lebensmittel
        </h2>

        <div className="space-y-3">

          {foods.length === 0 && (
            <p className="text-slate-400">
              Noch keine Lebensmittel vorhanden.
            </p>
          )}

          {foods.map((food) => (
            <div
              key={food.id}
              className="flex justify-between rounded-lg bg-slate-800 p-4"
            >
              <div>
                <div className="font-semibold">
                  {food.name}
                </div>

                <div className="text-sm text-slate-400">
                  {food.calories} kcal
                </div>
              </div>

              <div className="text-sm text-slate-400">
                P {food.protein} g ·
                K {food.carbs} g ·
                F {food.fat} g
              </div>
            </div>
          ))}

        </div>

      </div>

    </main>
  );
}