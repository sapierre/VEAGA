import { Tabs } from "expo-router";
import { Easing } from "react-native";

import { useTranslation } from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { UserHeader } from "~/components/common/layout/header";

const TabBarLabel = ({
  children,
  focused,
}: {
  children: string;
  focused: boolean;
}) => {
  return (
    <Text
      className={cn("text-xs text-muted-foreground", focused && "text-primary")}
    >
      {children}
    </Text>
  );
};

export default function DashboardLayout() {
  const { t } = useTranslation("common");

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarStyle: {
          paddingTop: 6,
        },
        animation: "fade",
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 200,
            easing: Easing.inOut(Easing.ease),
          },
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          header: () => <UserHeader />,
          title: t("home"),
          tabBarIcon: ({ focused }) => (
            <Icons.House
              size={22}
              className={cn("text-muted-foreground", {
                "text-primary": focused,
              })}
            />
          ),
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          headerShown: false,
          title: t("ai"),
          tabBarIcon: ({ focused }) => (
            <Icons.WandSparkles
              size={22}
              className={cn("text-muted-foreground", {
                "text-primary": focused,
              })}
            />
          ),
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: t("settings"),
          tabBarIcon: ({ focused }) => (
            <Icons.Settings
              size={22}
              className={cn("text-muted-foreground", {
                "text-primary": focused,
              })}
            />
          ),
          tabBarLabel: TabBarLabel,
        }}
      />
    </Tabs>
  );
}
