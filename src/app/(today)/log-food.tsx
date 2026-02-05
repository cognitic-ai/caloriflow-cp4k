import * as AC from "@bacons/apple-colors";
import { useCalories } from "@/context/calorie-context";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  useColorScheme,
  Alert,
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

function estimateCalories(description: string): number {
  const desc = description.toLowerCase();

  if (desc.includes("salad")) return 150;
  if (desc.includes("pizza")) return 285;
  if (desc.includes("burger")) return 540;
  if (desc.includes("sandwich")) return 350;
  if (desc.includes("pasta")) return 400;
  if (desc.includes("rice")) return 200;
  if (desc.includes("chicken")) return 335;
  if (desc.includes("steak") || desc.includes("beef")) return 450;
  if (desc.includes("fish") || desc.includes("salmon")) return 280;
  if (desc.includes("egg")) return 155;
  if (desc.includes("toast") || desc.includes("bread")) return 80;
  if (desc.includes("apple") || desc.includes("banana") || desc.includes("fruit")) return 95;
  if (desc.includes("yogurt")) return 150;
  if (desc.includes("coffee") || desc.includes("tea")) return 5;
  if (desc.includes("juice")) return 110;
  if (desc.includes("soda")) return 140;
  if (desc.includes("beer")) return 150;
  if (desc.includes("wine")) return 125;
  if (desc.includes("cookie") || desc.includes("cake")) return 200;
  if (desc.includes("ice cream")) return 250;
  if (desc.includes("chocolate")) return 150;

  return 250;
}

export default function LogFoodScreen() {
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [estimatedCalories, setEstimatedCalories] = useState(250);
  const { addFoodEntry } = useCalories();
  const router = useRouter();
  const scheme = useColorScheme();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Camera Permission",
        "Please allow camera access to take photos of your meals."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    if (text.length > 0) {
      setEstimatedCalories(estimateCalories(text));
    }
  };

  const handleSave = () => {
    if (!description.trim()) {
      Alert.alert("Missing Information", "Please describe what you ate.");
      return;
    }

    addFoodEntry({
      date: new Date(),
      description: description.trim(),
      imageUri,
      calories: estimatedCalories,
    });

    router.back();
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode="interactive"
    >
      <View style={{ padding: 16, gap: 20 }}>
        {imageUri && (
          <View
            style={{
              borderRadius: 16,
              borderCurve: "continuous",
              overflow: "hidden",
              aspectRatio: 1,
              backgroundColor: AC.secondarySystemBackground,
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </View>
        )}

        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Icon name="camera.fill" color={AC.label} />
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: AC.label,
              }}
            >
              Add Photo
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable onPress={takePhoto} style={{ flex: 1 }}>
              {({ pressed }) => (
                <View
                  style={{
                    backgroundColor:
                      scheme === "dark"
                        ? withOpacity(AC.systemBlue, 0.12)
                        : withOpacity(AC.systemBlue, 0.09),
                    borderRadius: 14,
                    borderCurve: "continuous",
                    padding: 18,
                    alignItems: "center",
                    gap: 10,
                    opacity: pressed ? 0.7 : 1,
                  }}
                >
                  <Icon name="camera.fill" color={AC.systemBlue} size={28} />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: AC.systemBlue,
                    }}
                  >
                    Take Photo
                  </Text>
                </View>
              )}
            </Pressable>
            <Pressable onPress={pickImage} style={{ flex: 1 }}>
              {({ pressed }) => (
                <View
                  style={{
                    backgroundColor:
                      scheme === "dark"
                        ? withOpacity(AC.systemIndigo, 0.12)
                        : withOpacity(AC.systemIndigo, 0.09),
                    borderRadius: 14,
                    borderCurve: "continuous",
                    padding: 18,
                    alignItems: "center",
                    gap: 10,
                    opacity: pressed ? 0.7 : 1,
                  }}
                >
                  <Icon name="photo.fill" color={AC.systemIndigo} size={28} />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: AC.systemIndigo,
                    }}
                  >
                    Choose Photo
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Icon name="text.alignleft" color={AC.label} />
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: AC.label,
              }}
            >
              Description
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor:
                scheme === "dark"
                  ? AC.secondarySystemBackground
                  : AC.systemBackground,
              borderRadius: 14,
              borderCurve: "continuous",
              padding: 16,
              fontSize: 17,
              color: AC.label,
              minHeight: 100,
              borderWidth: 1,
              borderColor: AC.separator,
            }}
            placeholder="What did you eat? (e.g., Chicken salad)"
            placeholderTextColor={AC.placeholderText}
            value={description}
            onChangeText={handleDescriptionChange}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View
          style={{
            backgroundColor:
              scheme === "dark"
                ? withOpacity(AC.systemGreen, 0.09)
                : withOpacity(AC.systemGreen, 0.06),
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 20,
            gap: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Icon name="flame.fill" color={AC.systemGreen} />
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                color: AC.label,
              }}
            >
              Estimated Calories
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            <TextInput
              style={{
                fontSize: 44,
                fontWeight: "700",
                color: AC.systemGreen,
                fontVariant: ["tabular-nums"],
                minWidth: 120,
              }}
              value={estimatedCalories.toString()}
              onChangeText={(text) => {
                const num = parseInt(text);
                if (!isNaN(num) && num >= 0) {
                  setEstimatedCalories(num);
                }
              }}
              keyboardType="number-pad"
            />
            <Text
              style={{
                fontSize: 20,
                color: AC.secondaryLabel,
              }}
            >
              cal
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
              This is an estimate. Tap to adjust.
            </Text>
          </View>
        </View>

        <Pressable onPress={handleSave}>
          {({ pressed }) => (
            <View
              style={{
                backgroundColor: AC.systemGreen,
                borderRadius: 14,
                borderCurve: "continuous",
                padding: 18,
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
              <Icon name="checkmark.circle.fill" color="#FFFFFF" size={22} />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                Save Entry
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}
