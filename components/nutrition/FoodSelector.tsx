"use client";

import { useEffect, useMemo, useState } from "react";
import { Food, getFoods } from "@/services/food.service";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (foodId: string, amount: number) => Promise<void>;
};

export default function FoodSelector({
  open,
  onClose,
  onSave,
}: Props) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [amount, setAmount] = useState("100");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    async function loadFoods() {
      const data = await getFoods();
      setFoods(data);
    }

    loadFoods();
  }, [open]);

  const filteredFoods = useMemo(() => {
    const text = search.toLowerCase().trim();

    if (!text) return foods;

    return foods.filter((food) =>
      food.name.toLowerCase().includes(text)
    );
  }, [foods, search]);

  async function handleSave() {
    if (!selectedFood) {
      alert("Bitte ein Lebensmittel auswählen.");
      return;
    }

    setLoading(true);

    try {
      await onSave(selectedFood.id, Number(amount));

      setSearch("");
      setSelectedFood(null);
      setAmount("100");

      onClose();
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

      <div className="w-full max-w-xl rounded-xl bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Lebensmittel auswählen
        </h2>

        <input
          placeholder="Suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-5 w-full rounded-lg bg-slate-800 p-3"
        />

        <div className="mb-5 h-72 overflow-y-auto space-y-2">

          {filteredFoods.map((food) => (

            <button
              key={food.id}
              onClick={() => setSelectedFood(food)}
              className={`w-full rounded-lg p-4 text-left transition ${
                selectedFood?.id === food.id
                  ? "bg-blue-600"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <div className="font-semibold">
                {food.name}
              </div>

              <div className="text-sm text-slate-300">
                {food.calories} kcal ·
                P {food.protein} ·
                K {food.carbs} ·
                F {food.fat}
              </div>
            </button>

          ))}

        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-6 w-full rounded-lg bg-slate-800 p-3"
          placeholder="Menge in Gramm"
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg bg-slate-700 px-5 py-2"
          >
            Abbrechen
          </button>

          <button
            disabled={loading}
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-5 py-2"
          >
            {loading ? "Speichern..." : "Hinzufügen"}
          </button>

        </div>

      </div>

    </div>
  );
}