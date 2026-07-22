type Props = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export default function NutritionSummary({
  calories,
  protein,
  carbs,
  fat,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Kalorien</p>
        <h2 className="mt-2 text-3xl font-bold">
          {calories.toFixed(0)}
        </h2>
        <p className="text-slate-400">kcal</p>
      </div>

      <div className="rounded-xl bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Protein</p>
        <h2 className="mt-2 text-3xl font-bold">
          {protein.toFixed(1)}
        </h2>
        <p className="text-slate-400">g</p>
      </div>

      <div className="rounded-xl bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Kohlenhydrate</p>
        <h2 className="mt-2 text-3xl font-bold">
          {carbs.toFixed(1)}
        </h2>
        <p className="text-slate-400">g</p>
      </div>

      <div className="rounded-xl bg-slate-900 p-5">
        <p className="text-sm text-slate-400">Fett</p>
        <h2 className="mt-2 text-3xl font-bold">
          {fat.toFixed(1)}
        </h2>
        <p className="text-slate-400">g</p>
      </div>
    </div>
  );
}