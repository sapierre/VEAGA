import { router, Stack } from "expo-router";

import { BaseHeader } from "~/components/common/layout/header";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <BaseHeader onBack={router.back} />,
        animation: "fade",
        animationDuration: 200,
      }}
    />
  );
}
