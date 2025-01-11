import { useMutation } from "@tanstack/react-query";
import { Alert, Pressable } from "react-native";

import { Card, CardContent } from "@turbostarter/ui-mobile/card";
import { Icons } from "@turbostarter/ui-mobile/icons";
import { Text } from "@turbostarter/ui-mobile/text";

import { Spinner } from "~/components/common/spinner";
import { signOut, useSession } from "~/lib/auth";

export const Logout = () => {
  const { data, isPending } = useSession();
  const { mutate, isPending: isSigningOut } = useMutation({
    mutationFn: () => signOut(),
  });

  if (isPending || !data?.user) {
    return null;
  }

  return (
    <>
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
      {isSigningOut && <Spinner />}
    </>
  );
};
