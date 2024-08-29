import { Tabs, router } from "expo-router";

import { Header } from "~/components/common/layout/header";
import { pathsConfig } from "~/config/paths";

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
      />

      <Tabs.Screen name="auth" />
      <Tabs.Screen name="blog" />
      <Tabs.Screen name="billing" />
    </Tabs>
  );
}
