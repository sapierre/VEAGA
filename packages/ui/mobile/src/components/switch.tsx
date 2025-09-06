import * as SwitchPrimitives from "@rn-primitives/switch";
import { Platform } from "react-native";

import { cn } from "@turbostarter/ui";

function Switch({
  className,
  ...props
}: SwitchPrimitives.RootProps & React.RefAttributes<SwitchPrimitives.RootRef>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        "flex h-8 w-14 shrink-0 flex-row items-center rounded-full border border-transparent shadow-sm shadow-black/5",
        Platform.select({
          web: "peer inline-flex outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed",
        }),
        props.checked ? "bg-primary" : "bg-input dark:bg-input/80",
        props.disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "size-7 rounded-full bg-background transition-transform",
          Platform.select({
            web: "pointer-events-none block ring-0",
          }),
          props.checked
            ? "translate-x-6 dark:bg-primary-foreground"
            : "translate-x-0 dark:bg-foreground",
        )}
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
