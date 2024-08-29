import { Tabs, router } from "expo-router";

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
  return (
    <Tabs
      screenOptions={({ route }) => ({
        header: () => (
          <Header
            title={route.name.slice(0, 1).toUpperCase() + route.name.slice(1)}
          />
        ),
      })}
    >
      <Tabs.Screen
        name="home"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.navigate(pathsConfig.index);
          },
        })}
        options={{
          title: "Home",
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
          title: "Auth",
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
        name="blog"
        options={{
          title: "Blog",
          tabBarIcon: ({ focused }) => (
            <Icons.Newspaper
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
        name="billing"
        options={{
          title: "Billing",
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icons.UserRound
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
