import { ThemeProvider } from "@/components/theme-provider";
import { CalorieProvider } from "@/context/calorie-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <CalorieProvider>
        <TabsLayout />
      </CalorieProvider>
    </ThemeProvider>
  );
}

function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="(today)"
        options={{
          title: "Today",
          tabBarIcon: (props) => <MaterialIcons {...props} name="today" />,
        }}
      />
      <WebTabs.Screen
        name="(history)"
        options={{
          title: "History",
          tabBarIcon: (props) => <MaterialIcons {...props} name="history" />,
        }}
      />
      <WebTabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: (props) => <MaterialIcons {...props} name="person" />,
        }}
      />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(today)">
        <NativeTabs.Trigger.Label>Today</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "calendar", selected: "calendar.badge.checkmark" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="today" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(history)">
        <NativeTabs.Trigger.Label>History</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: "clock" },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="history" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(profile)">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "person.crop.circle", selected: "person.crop.circle.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="person" />,
            },
          })}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
