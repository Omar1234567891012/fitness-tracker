"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type WeightEntry = {
  date: string;
  weight: number;
};

type Props = {
  data: WeightEntry[];
};

export default function WeightChart({ data }: Props) {
  return (
    <div className="mt-8 h-80 rounded-2xl bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        Gewichtsverlauf
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="weight"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}