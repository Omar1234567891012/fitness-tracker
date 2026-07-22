"use client";

import { useEffect, useState } from "react";
import { getProfile, saveProfile } from "@/services/profile.service";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");

  const [calorieGoal, setCalorieGoal] = useState("2200");
  const [proteinGoal, setProteinGoal] = useState("180");
  const [carbsGoal, setCarbsGoal] = useState("250");
  const [fatGoal, setFatGoal] = useState("70");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const profile = await getProfile();

      if (!profile) return;

      setName(profile.name ?? "");
      setHeight(profile.height?.toString() ?? "");
      setTargetWeight(profile.target_weight?.toString() ?? "");

      setCalorieGoal(profile.calorie_goal?.toString() ?? "2200");
      setProteinGoal(profile.protein_goal?.toString() ?? "180");
      setCarbsGoal(profile.carbs_goal?.toString() ?? "250");
      setFatGoal(profile.fat_goal?.toString() ?? "70");
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave() {
    setLoading(true);

    try {
      await saveProfile({
        name,
        height: Number(height),
        target_weight: Number(targetWeight),

        calorie_goal: Number(calorieGoal),
        protein_goal: Number(proteinGoal),
        carbs_goal: Number(carbsGoal),
        fat_goal: Number(fatGoal),
      });

      alert("Profil erfolgreich gespeichert.");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-8">
      <div className="rounded-xl border bg-white p-8 shadow">

        <h1 className="mb-8 text-3xl font-bold">
          Mein Profil
        </h1>

        <div className="space-y-5">

          <div>
            <label className="mb-2 block font-semibold">
              Name
            </label>

            <input
              className="w-full rounded-lg border p-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Körpergröße (cm)
            </label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Zielgewicht (kg)
            </label>

            <input
              type="number"
              step="0.1"
              className="w-full rounded-lg border p-3"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
            />
          </div>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold">
            Ernährungsziele
          </h2>

          <div>
            <label className="mb-2 block font-semibold">
              Kalorienziel (kcal)
            </label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              value={calorieGoal}
              onChange={(e) => setCalorieGoal(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Proteinziel (g)
            </label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              value={proteinGoal}
              onChange={(e) => setProteinGoal(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Kohlenhydratziel (g)
            </label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              value={carbsGoal}
              onChange={(e) => setCarbsGoal(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Fettziel (g)
            </label>

            <input
              type="number"
              className="w-full rounded-lg border p-3"
              value={fatGoal}
              onChange={(e) => setFatGoal(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Speichert..." : "Profil speichern"}
          </button>

        </div>

      </div>
    </main>
  );
}