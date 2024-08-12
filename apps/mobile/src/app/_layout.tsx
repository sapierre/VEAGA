import "@turbostarter/tailwind-config/variables";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
