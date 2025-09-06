import { router, Stack } from "expo-router";

import { isKey, useTranslation } from "@turbostarter/i18n";
import { capitalize } from "@turbostarter/shared/utils";

import { BaseHeader } from "~/components/common/layout/header";

export default function AccountLayout() {
  const { t, i18n } = useTranslation("common");

  return (
    <Stack
      screenOptions={({ route }) => {
        const name = route.name === "index" ? "account" : route.name;

        return {
          header: () => (
            <BaseHeader
              title={isKey(name, i18n, "common") ? t(name) : capitalize(name)}
              onBack={() => router.back()}
            />
          ),
          animation: "fade",
          animationDuration: 200,
        };
      }}
    />
  );
}
