"use client";

import { Trash2 } from "lucide-react";
import { MealEntry } from "@/services/meal-entry.service";

type Props = {
  title: string;
  entries: MealEntry[];
  onAdd: () => void;
  onDelete: (id: string) => void;
};

export default function MealCard({
  title,
  entries,
  onAdd,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl bg-slate-900 p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <button
          onClick={onAdd}
          className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          + Lebensmittel
        </button>

      </div>

      {entries.length === 0 && (
        <p className="text-slate-400">
          Keine Einträge vorhanden.
        </p>
      )}

      <div className="space-y-3">

        {entries.map((entry) => {
          const factor = entry.amount / 100;

          return (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-lg bg-slate-800 p-4"
            >
              <div>

                <div className="font-semibold">
                  {entry.food.name}
                </div>

                <div className="text-sm text-slate-400">
                  {entry.amount} g
                </div>

              </div>

              <div className="flex items-center gap-6">

                <div className="text-right">

                  <div className="font-semibold">
                    {(entry.food.calories * factor).toFixed(0)} kcal
                  </div>

                  <div className="text-xs text-slate-400">
                    P {(entry.food.protein * factor).toFixed(1)}
                    {" • "}
                    K {(entry.food.carbs * factor).toFixed(1)}
                    {" • "}
                    F {(entry.food.fat * factor).toFixed(1)}
                  </div>

                </div>

                <button
                  onClick={() => onDelete(entry.id)}
                  className="rounded-lg p-2 text-red-400 hover:bg-red-500/20"
                  title="Löschen"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}