import * as AC from "@bacons/apple-colors";
import { useCalories } from "@/context/calorie-context";
import { ImportWorkouts } from "@/components/import-workouts";
import { Link } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useColorScheme,
} from "react-native";

export default function TodayScreen() {
  const { getTodayEntries, getTodayCalories, goals, deleteEntry } =
    useCalories();
  const todayEntries = getTodayEntries();
  const { consumed, burned, net } = getTodayCalories();
  const remaining = goals.targetCalories - net;
  const scheme = useColorScheme();

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
            gap: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: AC.label,
            }}
          >
            Daily Summary
          </Text>
          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>
                Consumed
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: AC.systemGreen,
                  fontVariant: ["tabular-nums"],
                }}
              >
                {consumed} cal
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 15, color: AC.secondaryLabel }}>
                Burned
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: AC.systemOrange,
                  fontVariant: ["tabular-nums"],
                }}
              >
                {burned} cal
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: AC.separator,
                marginVertical: 4,
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontSize: 17, fontWeight: "600", color: AC.label }}
              >
                Remaining
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color:
                    remaining >= 0 ? AC.systemBlue : AC.systemRed,
                  fontVariant: ["tabular-nums"],
                }}
              >
                {remaining} cal
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                color: AC.tertiaryLabel,
                textAlign: "center",
              }}
            >
              Goal: {goals.targetCalories} cal
            </Text>
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <Link href="/(today)/log-food" asChild>
            <Pressable>
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
                    Log Food
                  </Text>
                </View>
              )}
            </Pressable>
          </Link>
          <ImportWorkouts />
        </View>

        <View style={{ gap: 12 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: AC.label,
            }}
          >
            Today's Entries
          </Text>
          {todayEntries.length === 0 ? (
            <View
              style={{
                backgroundColor:
                  scheme === "dark"
                    ? AC.secondarySystemBackground
                    : AC.systemBackground,
                borderRadius: 16,
                borderCurve: "continuous",
                padding: 40,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: AC.secondaryLabel,
                  textAlign: "center",
                }}
              >
                No entries yet today.{"\n"}Tap "Log Food" to get started!
              </Text>
            </View>
          ) : (
            todayEntries.map((entry) => (
              <Pressable
                key={entry.id}
                onLongPress={() => deleteEntry(entry.id)}
              >
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
                      gap: 8,
                      opacity: pressed ? 0.7 : 1,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "600",
                          color: AC.label,
                          flex: 1,
                        }}
                      >
                        {entry.type === "food"
                          ? entry.description
                          : entry.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: "700",
                          color:
                            entry.type === "food"
                              ? AC.systemGreen
                              : AC.systemOrange,
                          fontVariant: ["tabular-nums"],
                        }}
                      >
                        {entry.type === "food"
                          ? `+${entry.calories}`
                          : `-${entry.caloriesBurned}`}{" "}
                        cal
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 13,
                        color: AC.secondaryLabel,
                      }}
                    >
                      {new Date(entry.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
