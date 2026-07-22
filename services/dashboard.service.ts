import { getProfile } from "./profile.service";
import { getWeights } from "./weight.service";

export type DashboardStats = {
  currentWeight: number;
  targetWeight: number;
  bmi: number;
  remaining: number;
};

export async function getDashboardStats(): Promise<DashboardStats | null> {
  const profile = await getProfile();
  const weights = await getWeights();

  if (!profile || weights.length === 0 || !profile.height) {
    return null;
  }

  const currentWeight = Number(weights[0].weight);
  const targetWeight = Number(profile.target_weight ?? currentWeight);

  const heightMeters = profile.height / 100;

  const bmi = Number(
    (currentWeight / (heightMeters * heightMeters)).toFixed(1)
  );

  const remaining = Number(
    (currentWeight - targetWeight).toFixed(1)
  );

  return {
    currentWeight,
    targetWeight,
    bmi,
    remaining,
  };
}