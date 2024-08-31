import { View } from "react-native";

import { Avatar, AvatarFallback } from "@turbostarter/ui-mobile/avatar";
import { Text } from "@turbostarter/ui-mobile/text";

export const User = () => {
  return (
    <View className="items-center">
      <Avatar alt="" className="mb-4 size-28">
        <AvatarFallback>
          <Text className="text-3xl">JD</Text>
        </AvatarFallback>
      </Avatar>

      <Text>John Doe</Text>
      <Text className="text-muted-foreground">john@gmail.com</Text>
    </View>
  );
};
