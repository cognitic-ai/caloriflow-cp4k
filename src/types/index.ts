export interface FoodEntry {
  id: string;
  type: "food";
  date: Date;
  description: string;
  calories: number;
  imageUri?: string;
}

export interface ExerciseEntry {
  id: string;
  type: "exercise";
  date: Date;
  name: string;
  duration: number;
  caloriesBurned: number;
}

export type CalorieEntry = FoodEntry | ExerciseEntry;

export interface DailyGoals {
  targetCalories: number;
}
