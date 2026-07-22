"use client";

import { useEffect, useState } from "react";
import { addWeight, getWeights } from "@/services/weight.service";
import WeightChart from "./WeightChart";

type WeightEntry = {
  id: string;
  weight: number;
  created_at: string;
};

export default function WeightTracker() {
  const [weight, setWeight] = useState("");
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const loadWeights = async () => {
    try {
      const data = await getWeights();
      setWeights(data ?? []);
    } catch (err) {
      console.error("Fehler beim Laden:", err);
    }
  };

  useEffect(() => {
    loadWeights();
  }, []);

  const handleSave = async () => {
    if (!weight) return;

    const value = parseFloat(weight);

    if (isNaN(value) || value <= 0) {
      alert("Bitte ein gültiges Gewicht eingeben.");
      return;
    }

    setLoading(true);

    try {
      await addWeight(value);
      setWeight("");
      await loadWeights();
    } catch (err: any) {
      console.error("Speicherfehler:", err);
      alert(err?.message || "Gewicht konnte nicht gespeichert werden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Gewicht eintragen</h2>

        <div className="flex gap-3">
          <input
            type="number"
            step="0.1"
            value={weight}
            placeholder="z. B. 82.4"
            onChange={(e) => setWeight(e.target.value)}
            className="flex-1 rounded-lg border p-3"
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Speichert..." : "Speichern"}
          </button>
        </div>

        <h3 className="mt-8 mb-3 text-lg font-semibold">
          Gewichtsverlauf
        </h3>

        {weights.length === 0 ? (
          <p className="text-gray-500">
            Noch keine Einträge vorhanden.
          </p>
        ) : (
          <ul className="space-y-2">
            {weights.map((entry) => (
              <li
                key={entry.id}
                className="flex justify-between rounded-lg border p-3"
              >
                <span>{entry.weight} kg</span>
                <span className="text-gray-500">
                  {new Date(entry.created_at).toLocaleDateString("de-DE")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <WeightChart
        data={weights
          .slice()
          .reverse()
          .map((entry) => ({
            date: new Date(entry.created_at).toLocaleDateString("de-DE"),
            weight: entry.weight,
          }))}
      />
    </div>
  );
}