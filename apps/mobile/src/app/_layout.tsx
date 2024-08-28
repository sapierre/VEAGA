import * as Application from "expo-application";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Header } from "~/components/common/layout/header";
import { TABS_PREFIX } from "~/config/paths";
import "~/styles/globals.css";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name={TABS_PREFIX} options={{ headerShown: false }} />

        <Stack.Screen
          name="index"
          options={{
            header: () => <Header title={Application.applicationName ?? ""} />,
          }}
        />
      </Stack>
      <StatusBar barStyle="light-content" />
    </SafeAreaProvider>
  );
};

export default RootLayout;
