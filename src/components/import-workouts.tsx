import * as AC from "@bacons/apple-colors";
import { Image } from "expo-image";
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
            backgroundColor: AC.systemPink,
            borderRadius: 14,
            borderCurve: "continuous",
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            opacity: pressed ? 0.8 : 1,
            shadowColor: AC.systemPink,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          <Image
            source="sf:heart.fill"
            style={{ width: 22, height: 22, tintColor: "#FFFFFF" }}
          />
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              color: "#FFFFFF",
            }}
          >
            Health
          </Text>
        </View>
      )}
    </Pressable>
  );
}
