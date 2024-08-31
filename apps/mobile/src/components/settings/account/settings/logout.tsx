import { useMutation } from "@tanstack/react-query";
import { Alert, Pressable } from "react-native";

import { Card, CardContent } from "@turbostarter/ui-mobile/card";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { api } from "~/lib/api/trpc";
import { auth } from "~/lib/auth";

export const Logout = () => {
  const utils = api.useUtils();
  const { data: user, isLoading } = api.user.get.useQuery();

  const { mutate } = useMutation({
    mutationFn: () => auth().signOut(),
    onSettled: async (data) => {
      const error = data?.error;

      if (error) {
        return Alert.alert("Something went wrong!", error.message);
      }

      await utils.user.get.invalidate();
    },
  });

  if (!isLoading && !user) {
    return null;
  }

  return (
    <Pressable
      hitSlop={8}
      onPress={() => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            style: "destructive",
            onPress: () => mutate(),
          },
        ]);
      }}
    >
      <Card>
        <CardContent className="flex-row items-center justify-between py-3">
          <Text className="text-lg text-destructive">Logout</Text>

          <Icons.ArrowRight className="text-destructive" size={20} />
        </CardContent>
      </Card>
    </Pressable>
  );
};
