export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold text-white">
          Willkommen 👋
        </h1>

        <p className="mt-2 text-slate-300">
          Schön, dass du wieder da bist.
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {today}
        </p>
      </div>
    </div>
  );
}