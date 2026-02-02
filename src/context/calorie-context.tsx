import React, { createContext, useContext, useState, useCallback } from "react";
import { CalorieEntry, DailyGoals, FoodEntry, ExerciseEntry } from "@/types";

interface CalorieContextType {
  entries: CalorieEntry[];
  goals: DailyGoals;
  addFoodEntry: (entry: Omit<FoodEntry, "id" | "type">) => void;
  addExerciseEntry: (entry: Omit<ExerciseEntry, "id" | "type">) => void;
  deleteEntry: (id: string) => void;
  updateGoals: (goals: Partial<DailyGoals>) => void;
  getTodayEntries: () => CalorieEntry[];
  getTodayCalories: () => { consumed: number; burned: number; net: number };
}

const CalorieContext = createContext<CalorieContextType | undefined>(undefined);

export function CalorieProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<CalorieEntry[]>([]);
  const [goals, setGoals] = useState<DailyGoals>({ targetCalories: 2000 });

  const addFoodEntry = useCallback((entry: Omit<FoodEntry, "id" | "type">) => {
    const newEntry: FoodEntry = {
      ...entry,
      id: Date.now().toString(),
      type: "food",
    };
    setEntries((prev) => [...prev, newEntry]);
  }, []);

  const addExerciseEntry = useCallback(
    (entry: Omit<ExerciseEntry, "id" | "type">) => {
      const newEntry: ExerciseEntry = {
        ...entry,
        id: Date.now().toString(),
        type: "exercise",
      };
      setEntries((prev) => [...prev, newEntry]);
    },
    []
  );

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const updateGoals = useCallback((newGoals: Partial<DailyGoals>) => {
    setGoals((prev) => ({ ...prev, ...newGoals }));
  }, []);

  const getTodayEntries = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });
  }, [entries]);

  const getTodayCalories = useCallback(() => {
    const todayEntries = getTodayEntries();
    const consumed = todayEntries
      .filter((e): e is FoodEntry => e.type === "food")
      .reduce((sum, e) => sum + e.calories, 0);
    const burned = todayEntries
      .filter((e): e is ExerciseEntry => e.type === "exercise")
      .reduce((sum, e) => sum + e.caloriesBurned, 0);
    return { consumed, burned, net: consumed - burned };
  }, [getTodayEntries]);

  return (
    <CalorieContext.Provider
      value={{
        entries,
        goals,
        addFoodEntry,
        addExerciseEntry,
        deleteEntry,
        updateGoals,
        getTodayEntries,
        getTodayCalories,
      }}
    >
      {children}
    </CalorieContext.Provider>
  );
}

export function useCalories() {
  const context = useContext(CalorieContext);
  if (!context) {
    throw new Error("useCalories must be used within CalorieProvider");
  }
  return context;
}
