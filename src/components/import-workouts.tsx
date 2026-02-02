import * as AC from "@bacons/apple-colors";
import { useCalories } from "@/context/calorie-context";
import { fetchTodayWorkouts, requestHealthPermissions } from "@/utils/health";
import { useState } from "react";
import { View, Text, Pressable, Alert, useColorScheme } from "react-native";

export function ImportWorkouts() {
  const [loading, setLoading] = useState(false);
  const { addExerciseEntry } = useCalories();
  const scheme = useColorScheme();

  const handleImport = async () => {
    setLoading(true);
    try {
      const hasPermission = await requestHealthPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Health Access Required",
          "Please grant access to Apple Health to import your workouts."
        );
        setLoading(false);
        return;
      }

      const workouts = await fetchTodayWorkouts();

      if (workouts.length === 0) {
        Alert.alert("No Workouts", "No workouts found for today.");
        setLoading(false);
        return;
      }

      workouts.forEach((workout) => {
        addExerciseEntry({
          date: workout.date,
          name: workout.name,
          duration: workout.duration,
          caloriesBurned: workout.caloriesBurned,
        });
      });

      Alert.alert(
        "Success",
        `Imported ${workouts.length} workout${workouts.length > 1 ? "s" : ""} from Apple Health.`
      );
    } catch (error) {
      Alert.alert("Error", "Failed to import workouts from Apple Health.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (process.env.EXPO_OS !== "ios") {
    return null;
  }

  return (
    <Pressable onPress={handleImport} disabled={loading}>
      {({ pressed }) => (
        <View
          style={{
            backgroundColor:
              scheme === "dark"
                ? AC.secondarySystemBackground
                : AC.systemBackground,
            borderRadius: 12,
            borderCurve: "continuous",
            padding: 16,
            alignItems: "center",
            opacity: pressed || loading ? 0.7 : 1,
            borderWidth: 1,
            borderColor: AC.separator,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: AC.systemBlue,
            }}
          >
            {loading ? "Importing..." : "Import from Apple Health"}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
