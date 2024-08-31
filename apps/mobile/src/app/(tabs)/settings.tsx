import { ScrollView, View } from "react-native";

import { ThemeSettings } from "~/components/settings/theme";
import { User } from "~/components/settings/user";

export default function Profile() {
  return (
    <ScrollView
      className="flex-1 bg-background px-6 py-10"
      contentContainerClassName="gap-10"
    >
      <User />
      <View className="gap-4">
        <ThemeSettings />
      </View>
    </ScrollView>
  );
}
