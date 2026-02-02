export interface FoodEntry {
  id: string;
  date: Date;
  description: string;
  imageUri?: string;
  calories: number;
  type: "food";
}

export interface ExerciseEntry {
  id: string;
  date: Date;
  name: string;
  caloriesBurned: number;
  duration: number;
  type: "exercise";
}

export type CalorieEntry = FoodEntry | ExerciseEntry;

export interface DailyGoals {
  targetCalories: number;
}
