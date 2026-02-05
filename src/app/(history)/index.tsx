import * as AC from "@bacons/apple-colors";
import { useCalories } from "@/context/calorie-context";
import { Image } from "expo-image";
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

function Icon({ name, color, size = 20 }: { name: string; color: any; size?: number }) {
  return (
    <Image
      source={`sf:${name}`}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
}

export default function HistoryScreen() {
  const { entries, deleteEntry } = useCalories();
  const scheme = useColorScheme();

  const groupedEntries = entries.reduce((acc, entry) => {
    const date = new Date(entry.date);
    const dateKey = date.toLocaleDateString();

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(entry);
    return acc;
  }, {} as Record<string, typeof entries>);

  const sortedDates = Object.keys(groupedEntries).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const calculateDayCalories = (dateEntries: typeof entries) => {
    const consumed = dateEntries
      .filter((e) => e.type === "food")
      .reduce((sum, e) => sum + e.calories, 0);
    const burned = dateEntries
      .filter((e) => e.type === "exercise")
      .reduce((sum, e) => sum + e.caloriesBurned, 0);
    return { consumed, burned, net: consumed - burned };
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={{ padding: 16, gap: 20 }}>
        {sortedDates.length === 0 ? (
          <View
            style={{
              backgroundColor:
                scheme === "dark"
                  ? AC.secondarySystemBackground
                  : AC.systemBackground,
              borderRadius: 20,
              borderCurve: "continuous",
              padding: 50,
              alignItems: "center",
              gap: 16,
            }}
          >
            <Icon name="clock.arrow.circlepath" color={AC.tertiaryLabel} size={56} />
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: AC.secondaryLabel,
                textAlign: "center",
              }}
            >
              No History Yet
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: AC.tertiaryLabel,
                textAlign: "center",
              }}
            >
              Start tracking your food and exercise to see your history here.
            </Text>
          </View>
        ) : (
          sortedDates.map((dateKey) => {
            const dateEntries = groupedEntries[dateKey];
            const { consumed, burned, net } = calculateDayCalories(dateEntries);

            return (
              <View key={dateKey} style={{ gap: 12 }}>
                <View
                  style={{
                    backgroundColor:
                      scheme === "dark"
                        ? AC.secondarySystemBackground
                        : AC.systemBackground,
                    borderRadius: 16,
                    borderCurve: "continuous",
                    padding: 16,
                    gap: 12,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Icon name="calendar" color={AC.systemBlue} size={20} />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: AC.label,
                        flex: 1,
                      }}
                    >
                      {dateKey}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        backgroundColor: withOpacity(AC.systemGreen, 0.07),
                        padding: 10,
                        borderRadius: 10,
                        borderCurve: "continuous",
                      }}
                    >
                      <Icon name="fork.knife" color={AC.systemGreen} size={14} />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: AC.systemGreen,
                          fontVariant: ["tabular-nums"],
                        }}
                      >
                        {consumed}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        backgroundColor: withOpacity(AC.systemOrange, 0.07),
                        padding: 10,
                        borderRadius: 10,
                        borderCurve: "continuous",
                      }}
                    >
                      <Icon name="flame.fill" color={AC.systemOrange} size={14} />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: AC.systemOrange,
                          fontVariant: ["tabular-nums"],
                        }}
                      >
                        {burned}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        backgroundColor: withOpacity(AC.systemBlue, 0.07),
                        padding: 10,
                        borderRadius: 10,
                        borderCurve: "continuous",
                      }}
                    >
                      <Icon name="equal.circle.fill" color={AC.systemBlue} size={14} />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: AC.systemBlue,
                          fontVariant: ["tabular-nums"],
                        }}
                      >
                        {net}
                      </Text>
                    </View>
                  </View>
                </View>
                {dateEntries.map((entry) => (
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
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            borderCurve: "continuous",
                            backgroundColor:
                              entry.type === "food"
                                ? withOpacity(AC.systemGreen, 0.1)
                                : withOpacity(AC.systemOrange, 0.1),
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon
                            name={entry.type === "food" ? "fork.knife" : "figure.run"}
                            color={entry.type === "food" ? AC.systemGreen : AC.systemOrange}
                            size={20}
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
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                            <Icon name="clock" color={AC.tertiaryLabel} size={12} />
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
                ))}
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
