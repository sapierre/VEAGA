import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "@turbostarter/ui/globals";

import "~/styles/globals.css";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
