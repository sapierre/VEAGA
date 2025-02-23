import { Tabs, router } from "expo-router";

import { isKey, useTranslation } from "@turbostarter/i18n";
import { capitalize } from "@turbostarter/shared/utils";
import { cn } from "@turbostarter/ui";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { Header } from "~/components/common/layout/header";
import { pathsConfig } from "~/config/paths";

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
  const { t, i18n } = useTranslation("common");

  return (
    <Tabs
      screenOptions={({ route }) => ({
        header: () => (
          <Header
            title={
              isKey(route.name, i18n, "common")
                ? t(route.name)
                : capitalize(route.name)
            }
          />
        ),
        tabBarStyle: {
          paddingTop: 6,
        },
      })}
    >
      <Tabs.Screen
        name="home"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.dismissAll();
            router.replace(pathsConfig.index);
          },
        })}
        options={{
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
        name="auth"
        options={{
          headerShown: false,
          title: t("auth"),
          tabBarIcon: ({ focused }) => (
            <Icons.KeyRound
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
          title: t("ai"),
          tabBarIcon: ({ focused }) => (
            <Icons.WandSparkles
              size={22}
              className={cn("text-muted-foreground", {
                "text-primary": focused,
              })}
            />
          ),
          header: () => <Header title="AI" />,
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="billing"
        options={{
          title: t("billing"),
          tabBarIcon: ({ focused }) => (
            <Icons.Wallet
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
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
