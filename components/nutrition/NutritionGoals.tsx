"use client";

type Props = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
};

function ProgressBar({
  value,
  goal,
}: {
  value: number;
  goal: number;
}) {
  const percent =
    goal > 0 ? Math.min((value / goal) * 100, 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{value.toFixed(0)}</span>
        <span>{goal.toFixed(0)}</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-right text-xs text-slate-400">
        {percent.toFixed(0)} %
      </p>
    </div>
  );
}

export default function NutritionGoals({
  calories,
  protein,
  carbs,
  fat,

  calorieGoal,
  proteinGoal,
  carbsGoal,
  fatGoal,
}: Props) {
  return (
    <div className="rounded-xl bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Tagesziele
      </h2>

      <div className="space-y-8">

        <div>
          <h3 className="mb-2 font-semibold">
            🔥 Kalorien
          </h3>

          <ProgressBar
            value={calories}
            goal={calorieGoal}
          />
        </div>

        <div>
          <h3 className="mb-2 font-semibold">
            🥩 Protein
          </h3>

          <ProgressBar
            value={protein}
            goal={proteinGoal}
          />
        </div>

        <div>
          <h3 className="mb-2 font-semibold">
            🍞 Kohlenhydrate
          </h3>

          <ProgressBar
            value={carbs}
            goal={carbsGoal}
          />
        </div>

        <div>
          <h3 className="mb-2 font-semibold">
            🥑 Fett
          </h3>

          <ProgressBar
            value={fat}
            goal={fatGoal}
          />
        </div>

      </div>

    </div>
  );
}