import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import WeightTracker from "@/components/WeightTracker";
import DailyGoals from "@/components/dashboard/DailyGoals";
import UserMenu from "@/components/UserMenu";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <DashboardHeader />
        <UserMenu />
      </div>

      <StatsGrid />

      <WeightTracker />

      <DailyGoals />
    </main>
  );
}