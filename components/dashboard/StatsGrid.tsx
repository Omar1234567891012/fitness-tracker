"use client";

import { useEffect, useState } from "react";
import {
  Flame,
  Droplets,
  Footprints,
  Moon,
  Scale,
  Beef,
  Target,
  Activity,
} from "lucide-react";

import StatCard from "@/components/StatCard";
import {
  getDashboardStats,
  DashboardStats,
} from "@/services/dashboard.service";

export default function StatsGrid() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Gewicht"
        value={stats?.currentWeight?.toString() ?? "--"}
        unit="kg"
        icon={<Scale size={28} />}
      />

      <StatCard
        title="Zielgewicht"
        value={stats?.targetWeight?.toString() ?? "--"}
        unit="kg"
        icon={<Target size={28} />}
      />

      <StatCard
        title="BMI"
        value={stats?.bmi?.toString() ?? "--"}
        icon={<Activity size={28} />}
      />

      <StatCard
        title="Bis zum Ziel"
        value={stats?.remaining?.toString() ?? "--"}
        unit="kg"
        icon={<Scale size={28} />}
      />

      <StatCard
        title="Kalorien"
        value="2150"
        unit="kcal"
        icon={<Flame size={28} />}
      />

      <StatCard
        title="Protein"
        value="165"
        unit="g"
        icon={<Beef size={28} />}
      />

      <StatCard
        title="Wasser"
        value="2.4"
        unit="L"
        icon={<Droplets size={28} />}
      />

      <StatCard
        title="Schritte"
        value="8234"
        icon={<Footprints size={28} />}
      />

      <StatCard
        title="Schlaf"
        value="7.5"
        unit="Std"
        icon={<Moon size={28} />}
      />
    </div>
  );
}