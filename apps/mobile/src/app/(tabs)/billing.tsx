import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Billing() {
  return (
    <View>
      <Text>{JSON.stringify(router.canGoBack())} billing</Text>
    </View>
  );
}
