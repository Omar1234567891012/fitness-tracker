export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
}

export interface DailyGoals {
  calories: number;
  protein: number;
  water: number;
  steps: number;
}

export interface Workout {
  id: string;
  name: string;
  duration: number;
  exercises: number;
  date: string;
}