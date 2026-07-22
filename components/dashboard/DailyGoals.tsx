export default function DailyGoals() {
  const goals = [
    {
      title: "Kalorien",
      value: 2100,
      target: 2500,
      unit: "kcal",
    },
    {
      title: "Protein",
      value: 165,
      target: 180,
      unit: "g",
    },
    {
      title: "Wasser",
      value: 2.1,
      target: 3,
      unit: "L",
    },
    {
      title: "Schritte",
      value: 8234,
      target: 10000,
      unit: "",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        🎯 Tagesziele
      </h2>

      <div className="space-y-6">
        {goals.map((goal) => {
          const percent = Math.min(
            (goal.value / goal.target) * 100,
            100
          );

          return (
            <div key={goal.title}>
              <div className="mb-2 flex justify-between text-white">
                <span>{goal.title}</span>

                <span>
                  {goal.value}
                  {goal.unit} / {goal.target}
                  {goal.unit}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}