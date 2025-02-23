import { ActivityIndicator, Modal, View } from "react-native";

import { cn } from "@turbostarter/ui";

import { HEIGHT, isIOS, WIDTH } from "~/utils/device";

export const Spinner = () => {
  return (
    <Modal transparent={isIOS}>
      <View
        className={cn(
          "items-center justify-center",
          isIOS && "bg-foreground/60",
        )}
        style={{ width: WIDTH, height: HEIGHT }}
      >
        <ActivityIndicator size="large" className="text-background" />
      </View>
    </Modal>
  );
};
