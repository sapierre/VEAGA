import { Stack } from "expo-router";

import { Header } from "~/components/common/layout/header";

export default function AuthLayout() {
  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{
          header: () => <Header title="Login" />,
        }}
      />

      <Stack.Screen
        name="register"
        options={{
          header: () => <Header title="Register" />,
        }}
      />
    </Stack>
  );
}
