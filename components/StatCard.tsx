import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string;
  unit?: string;
  icon?: ReactNode;
};

export default function StatCard({
  title,
  value,
  unit,
  icon,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20">
      {/* Hintergrund-Effekt */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all duration-300 group-hover:bg-blue-500/20" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <div className="mt-4 flex items-end gap-2">
            <span className="text-4xl font-bold text-white">
              {value}
            </span>

            {unit && (
              <span className="mb-1 text-lg text-slate-300">
                {unit}
              </span>
            )}
          </div>
        </div>

        {icon && (
          <div className="rounded-2xl bg-blue-600/20 p-3 text-blue-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}