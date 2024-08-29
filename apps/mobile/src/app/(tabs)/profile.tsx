import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Profile() {
  return (
    <View>
      <Text>{JSON.stringify(router.canGoBack())} Profile</Text>
    </View>
  );
}
