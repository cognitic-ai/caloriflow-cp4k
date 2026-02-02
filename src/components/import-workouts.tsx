import * as AC from "@bacons/apple-colors";
import { View, Text, Pressable, Alert, useColorScheme } from "react-native";

export function ImportWorkouts() {
  const scheme = useColorScheme();

  const handleImport = () => {
    Alert.alert(
      "Coming Soon",
      "Apple Health integration requires a custom dev client build. For now, you can manually log your workouts."
    );
  };

  if (process.env.EXPO_OS !== "ios") {
    return null;
  }

  return (
    <Pressable onPress={handleImport}>
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
            opacity: pressed ? 0.7 : 1,
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
            Import from Apple Health
          </Text>
        </View>
      )}
    </Pressable>
  );
}
