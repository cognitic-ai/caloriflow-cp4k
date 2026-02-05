import * as AC from "@bacons/apple-colors";
import { useCalories } from "@/context/calorie-context";
import { ImportWorkouts } from "@/components/import-workouts";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useColorScheme,
} from "react-native";

const withOpacity = (color: any, opacity: number) => {
  const hex = Math.round(opacity * 255).toString(16).padStart(2, "0");
  return `${color}${hex}`;
};

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
            borderRadius: 20,
            borderCurve: "continuous",
            padding: 20,
            gap: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                borderCurve: "continuous",
                backgroundColor: withOpacity(AC.systemIndigo, 0.12),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source="sf:chart.pie.fill"
                style={{ width: 20, height: 20, tintColor: AC.systemIndigo }}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: AC.label,
              }}
            >
              Daily Summary
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <View
              style={{
                flex: 1,
                backgroundColor:
                  scheme === "dark"
                    ? withOpacity(AC.systemGreen, 0.09)
                    : withOpacity(AC.systemGreen, 0.07),
                borderRadius: 14,
                borderCurve: "continuous",
                padding: 14,
                alignItems: "center",
                gap: 6,
              }}
            >
              <Image
                source="sf:fork.knife"
                style={{ width: 22, height: 22, tintColor: AC.systemGreen }}
              />
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: AC.systemGreen,
                  fontVariant: ["tabular-nums"],
                }}
              >
                {consumed}
              </Text>
              <Text style={{ fontSize: 12, color: AC.secondaryLabel }}>
                Consumed
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor:
                  scheme === "dark"
                    ? withOpacity(AC.systemOrange, 0.09)
                    : withOpacity(AC.systemOrange, 0.07),
                borderRadius: 14,
                borderCurve: "continuous",
                padding: 14,
                alignItems: "center",
                gap: 6,
              }}
            >
              <Image
                source="sf:flame.fill"
                style={{ width: 22, height: 22, tintColor: AC.systemOrange }}
              />
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: AC.systemOrange,
                  fontVariant: ["tabular-nums"],
                }}
              >
                {burned}
              </Text>
              <Text style={{ fontSize: 12, color: AC.secondaryLabel }}>
                Burned
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: withOpacity(
                  remaining >= 0 ? AC.systemBlue : AC.systemRed,
                  scheme === "dark" ? 0.09 : 0.07
                ),
                borderRadius: 14,
                borderCurve: "continuous",
                padding: 14,
                alignItems: "center",
                gap: 6,
              }}
            >
              <Image
                source="sf:target"
                style={{
                  width: 22,
                  height: 22,
                  tintColor: remaining >= 0 ? AC.systemBlue : AC.systemRed,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                  color: remaining >= 0 ? AC.systemBlue : AC.systemRed,
                  fontVariant: ["tabular-nums"],
                }}
              >
                {remaining}
              </Text>
              <Text style={{ fontSize: 12, color: AC.secondaryLabel }}>
                Remaining
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Image
              source="sf:flag.fill"
              style={{ width: 14, height: 14, tintColor: AC.tertiaryLabel }}
            />
            <Text
              style={{
                fontSize: 13,
                color: AC.tertiaryLabel,
              }}
            >
              Daily goal: {goals.targetCalories} cal
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <Link href="/(today)/log-food" asChild style={{ flex: 1 }}>
            <Pressable>
              {({ pressed }) => (
                <View
                  style={{
                    backgroundColor: AC.systemGreen,
                    borderRadius: 14,
                    borderCurve: "continuous",
                    padding: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    opacity: pressed ? 0.8 : 1,
                    shadowColor: AC.systemGreen,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                  }}
                >
                  <Image
                    source="sf:plus.circle.fill"
                    style={{ width: 22, height: 22, tintColor: "#FFFFFF" }}
                  />
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
          <View style={{ flex: 1 }}>
            <ImportWorkouts />
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Image
              source="sf:list.bullet.clipboard.fill"
              style={{ width: 20, height: 20, tintColor: AC.label }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: AC.label,
              }}
            >
              Today's Entries
            </Text>
          </View>
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
                gap: 12,
              }}
            >
              <Image
                source="sf:tray"
                style={{ width: 44, height: 44, tintColor: AC.tertiaryLabel }}
              />
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
                      borderRadius: 14,
                      borderCurve: "continuous",
                      padding: 14,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 14,
                      opacity: pressed ? 0.7 : 1,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.06,
                      shadowRadius: 6,
                      elevation: 2,
                    }}
                  >
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        borderCurve: "continuous",
                        backgroundColor:
                          entry.type === "food"
                            ? withOpacity(AC.systemGreen, 0.1)
                            : withOpacity(AC.systemOrange, 0.1),
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={
                          entry.type === "food"
                            ? "sf:fork.knife"
                            : "sf:figure.run"
                        }
                        style={{
                          width: 22,
                          height: 22,
                          tintColor:
                            entry.type === "food"
                              ? AC.systemGreen
                              : AC.systemOrange,
                        }}
                      />
                    </View>
                    <View style={{ flex: 1, gap: 2 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: AC.label,
                        }}
                      >
                        {entry.type === "food"
                          ? entry.description
                          : entry.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Image
                          source="sf:clock"
                          style={{
                            width: 12,
                            height: 12,
                            tintColor: AC.tertiaryLabel,
                          }}
                        />
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
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text
                        style={{
                          fontSize: 18,
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
                          : `-${entry.caloriesBurned}`}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: AC.tertiaryLabel,
                        }}
                      >
                        cal
                      </Text>
                    </View>
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
