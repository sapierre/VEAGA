import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "@turbostarter/tailwind-config/variables";

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
