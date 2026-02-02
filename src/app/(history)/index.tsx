import * as AC from "@bacons/apple-colors";
import { useCalories } from "@/context/calorie-context";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useColorScheme,
} from "react-native";

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
              No entries yet.{"\n"}Start tracking your food and exercise!
            </Text>
          </View>
        ) : (
          sortedDates.map((dateKey) => {
            const dateEntries = groupedEntries[dateKey];
            const { consumed, burned, net } = calculateDayCalories(dateEntries);

            return (
              <View key={dateKey} style={{ gap: 12 }}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      color: AC.label,
                    }}
                  >
                    {dateKey}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: AC.secondaryLabel,
                    }}
                  >
                    Net: {net} cal (Consumed: {consumed}, Burned: {burned})
                  </Text>
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
                ))}
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}
