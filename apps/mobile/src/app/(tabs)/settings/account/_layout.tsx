import { router, Stack } from "expo-router";

import { isKey, useTranslation } from "@turbostarter/i18n";
import { capitalize } from "@turbostarter/shared/utils";

import { Header } from "~/components/common/layout/header";

export default function AccountLayout() {
  const { t, i18n } = useTranslation("common");

  return (
    <Stack
      screenOptions={({ route }) => {
        const name = route.name === "index" ? "account" : route.name;

        return {
          header: () => (
            <Header
              title={isKey(name, i18n, "common") ? t(name) : capitalize(name)}
              onBack={() => router.back()}
            />
          ),
        };
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="name" />
      <Stack.Screen name="email" />
      <Stack.Screen name="password" />
      <Stack.Screen name="accounts" />
    </Stack>
  );
}
