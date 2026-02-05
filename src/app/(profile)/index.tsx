import * as AC from "@bacons/apple-colors";
import { useCalories } from "@/context/calorie-context";
import { Image } from "expo-image";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  useColorScheme,
} from "react-native";

const withOpacity = (color: any, opacity: number) => {
  const hex = Math.round(opacity * 255).toString(16).padStart(2, "0");
  return `${color}${hex}`;
};

function Icon({ name, color, size = 20 }: { name: string; color: any; size?: number }) {
  return (
    <Image
      source={`sf:${name}`}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

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
            borderRadius: 20,
            borderCurve: "continuous",
            padding: 20,
            gap: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                borderCurve: "continuous",
                backgroundColor: withOpacity(AC.systemBlue, 0.12),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="target" color={AC.systemBlue} size={24} />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: AC.label,
              }}
            >
              Daily Goals
            </Text>
          </View>

          <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Icon name="flame.fill" color={AC.systemOrange} size={18} />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: AC.label,
                }}
              >
                Target Calories
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor:
                  scheme === "dark"
                    ? AC.tertiarySystemBackground
                    : AC.secondarySystemBackground,
                borderRadius: 14,
                borderCurve: "continuous",
                padding: 14,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 24,
                  fontWeight: "600",
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
                cal/day
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Icon name="info.circle" color={AC.tertiaryLabel} size={14} />
              <Text
                style={{
                  fontSize: 13,
                  color: AC.tertiaryLabel,
                }}
              >
                Set your daily calorie goal for better tracking.
              </Text>
            </View>
          </View>

          <Pressable onPress={handleSave}>
            {({ pressed }) => (
              <View
                style={{
                  backgroundColor: AC.systemBlue,
                  borderRadius: 14,
                  borderCurve: "continuous",
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  opacity: pressed ? 0.8 : 1,
                  shadowColor: AC.systemBlue,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
              >
                <Icon name="checkmark.circle.fill" color="#FFFFFF" size={22} />
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
            borderRadius: 20,
            borderCurve: "continuous",
            padding: 20,
            gap: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                borderCurve: "continuous",
                backgroundColor: withOpacity(AC.systemPurple, 0.12),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="info.circle.fill" color={AC.systemPurple} size={24} />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: AC.label,
              }}
            >
              About
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              color: AC.secondaryLabel,
              lineHeight: 24,
            }}
          >
            This app helps you track your daily calorie intake and exercise.
            Log your meals by taking photos or describing what you eat, and
            import your workouts from Apple Health.
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: withOpacity(AC.systemYellow, 0.09),
              padding: 12,
              borderRadius: 12,
              borderCurve: "continuous",
            }}
          >
            <Icon name="lightbulb.fill" color={AC.systemYellow} size={20} />
            <Text
              style={{
                fontSize: 14,
                color: AC.label,
                flex: 1,
              }}
            >
              Tip: Long press any entry to delete it.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
