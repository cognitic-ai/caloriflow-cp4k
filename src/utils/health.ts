import * as Health from "expo-health";

export async function requestHealthPermissions() {
  if (process.env.EXPO_OS !== "ios") {
    return false;
  }

  try {
    const granted = await Health.requestPermissionsAsync({
      read: ["activeEnergyBurned", "workouts"],
    });
    return granted.granted;
  } catch (error) {
    console.error("Error requesting health permissions:", error);
    return false;
  }
}

export async function fetchTodayWorkouts() {
  if (process.env.EXPO_OS !== "ios") {
    return [];
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const workouts = await Health.queryWorkoutsAsync({
      startDate: today,
      endDate: endOfDay,
    });

    return workouts.map((workout) => ({
      name: workout.workoutActivityType || "Workout",
      date: new Date(workout.startDate),
      duration: workout.duration || 0,
      caloriesBurned: Math.round(workout.totalEnergyBurned || 0),
    }));
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}
