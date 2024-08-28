import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Auth() {
  return (
    <View>
      <Text>{JSON.stringify(router.canGoBack())} auth</Text>
    </View>
  );
}
