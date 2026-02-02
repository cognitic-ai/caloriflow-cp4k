import * as AC from "@bacons/apple-colors";
import { useCalories } from "@/context/calorie-context";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  useColorScheme,
} from "react-native";

export default function ProfileScreen() {
  const { goals, updateGoals } = useCalories();
  const [targetCalories, setTargetCalories] = useState(
    goals.targetCalories.toString()
  );
  const scheme = useColorScheme();

  const handleSave = () => {
    const newTarget = parseInt(targetCalories);
    if (!isNaN(newTarget) && newTarget > 0) {
      updateGoals({ targetCalories: newTarget });
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={{ padding: 16, gap: 20 }}>
        <View
          style={{
            backgroundColor:
              scheme === "dark"
                ? AC.secondarySystemBackground
                : AC.systemBackground,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 20,
            gap: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: AC.label,
            }}
          >
            Daily Goals
          </Text>

          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: AC.label,
              }}
            >
              Target Calories
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor:
                  scheme === "dark"
                    ? AC.tertiarySystemBackground
                    : AC.secondarySystemBackground,
                borderRadius: 12,
                borderCurve: "continuous",
                padding: 12,
                borderWidth: 1,
                borderColor: AC.separator,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 17,
                  color: AC.label,
                  fontVariant: ["tabular-nums"],
                }}
                value={targetCalories}
                onChangeText={setTargetCalories}
                keyboardType="number-pad"
                placeholder="2000"
                placeholderTextColor={AC.placeholderText}
              />
              <Text
                style={{
                  fontSize: 17,
                  color: AC.secondaryLabel,
                }}
              >
                calories
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: AC.tertiaryLabel,
              }}
            >
              Your daily calorie target helps track your nutrition goals.
            </Text>
          </View>

          <Pressable onPress={handleSave}>
            {({ pressed }) => (
              <View
                style={{
                  backgroundColor: AC.systemBlue,
                  borderRadius: 12,
                  borderCurve: "continuous",
                  padding: 16,
                  alignItems: "center",
                  opacity: pressed ? 0.7 : 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  Save Changes
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor:
              scheme === "dark"
                ? AC.secondarySystemBackground
                : AC.systemBackground,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 20,
            gap: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: AC.label,
            }}
          >
            About
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: AC.secondaryLabel,
              lineHeight: 22,
            }}
          >
            This app helps you track your daily calorie intake and exercise.
            Log your meals by taking photos or describing what you eat, and
            import your workouts from Apple Health.
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: AC.tertiaryLabel,
              marginTop: 8,
            }}
          >
            Tip: Long press any entry to delete it.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
