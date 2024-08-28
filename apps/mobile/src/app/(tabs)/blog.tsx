import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Blog() {
  return (
    <View>
      <Text>{JSON.stringify(router.canGoBack())} Blog</Text>
    </View>
  );
}
