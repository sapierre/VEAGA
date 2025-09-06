import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetFlatList as GBottomSheetFlatList,
  BottomSheetFooter as GBottomSheetFooter,
  BottomSheetTextInput as GBottomSheetTextInput,
  BottomSheetView as GBottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import * as Slot from "@rn-primitives/slot";
import * as React from "react";
import { Keyboard, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@turbostarter/ui";

import { Button } from "./button";
import { Icons } from "./icons";

import type {
  BottomSheetBackdropProps,
  BottomSheetFooterProps as GBottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import type { GestureResponderEvent, ViewStyle } from "react-native";

interface BottomSheetContext {
  sheetRef: React.RefObject<BottomSheetModal | null>;
}

const BottomSheetContext = React.createContext<BottomSheetContext | null>(null);

function BottomSheet({ ...props }: React.ComponentProps<typeof View>) {
  const sheetRef = React.useRef<BottomSheetModal>(null);

  return (
    <BottomSheetContext.Provider value={{ sheetRef: sheetRef }}>
      <View {...props} />
    </BottomSheetContext.Provider>
  );
}

function useBottomSheetContext() {
  const context = React.useContext(BottomSheetContext);
  if (!context) {
    throw new Error(
      "BottomSheet compound components cannot be rendered outside the BottomSheet component",
    );
  }
  return context;
}

const CLOSED_INDEX = -1;

type BottomSheetContentRef = React.ComponentRef<typeof BottomSheetModal>;

type BottomSheetContentProps = Omit<
  React.ComponentProps<typeof BottomSheetModal>,
  "backdropComponent"
> & {
  backdropProps?: Partial<React.ComponentProps<typeof BottomSheetBackdrop>>;
};

const BottomSheetContent = React.forwardRef<
  BottomSheetContentRef,
  BottomSheetContentProps
>(
  (
    {
      enablePanDownToClose = true,
      enableDynamicSizing = true,
      backdropProps,
      backgroundStyle,
      android_keyboardInputMode = "adjustResize",
      ...props
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const { sheetRef } = useBottomSheetContext();

    React.useImperativeHandle(ref, () => {
      if (!sheetRef.current) {
        return {} as BottomSheetModalMethods;
      }
      return sheetRef.current;
    }, [sheetRef]);

    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => {
        const {
          pressBehavior = "close",
          disappearsOnIndex = CLOSED_INDEX,
          style,
          onPress,
          ...rest
        } = {
          ...props,
          ...backdropProps,
        };
        return (
          <BottomSheetBackdrop
            disappearsOnIndex={disappearsOnIndex}
            pressBehavior={pressBehavior}
            style={style}
            onPress={() => {
              if (Keyboard.isVisible()) {
                Keyboard.dismiss();
              }
              onPress?.();
            }}
            {...rest}
          />
        );
      },
      [backdropProps],
    );

    return (
      <BottomSheetModal
        ref={sheetRef}
        index={0}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={enableDynamicSizing}
        backgroundStyle={[{ backgroundColor: colors.card }, backgroundStyle]}
        handleIndicatorStyle={{
          backgroundColor: colors.border,
        }}
        topInset={insets.top}
        android_keyboardInputMode={android_keyboardInputMode}
        {...props}
      />
    );
  },
);

function BottomSheetOpenTrigger({
  onPress,
  asChild = false,
  ...props
}: React.ComponentProps<typeof Pressable> & {
  asChild?: boolean;
}) {
  const { sheetRef } = useBottomSheetContext();
  function handleOnPress(ev: GestureResponderEvent) {
    sheetRef.current?.present();
    onPress?.(ev);
  }
  const Trigger = asChild ? Slot.Pressable : Pressable;
  return <Trigger onPress={handleOnPress} {...props} />;
}

function BottomSheetCloseTrigger({
  onPress,
  asChild = false,
  ...props
}: React.ComponentProps<typeof Pressable> & {
  asChild?: boolean;
}) {
  const { dismiss } = useBottomSheetModal();
  function handleOnPress(ev: GestureResponderEvent) {
    dismiss();
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    onPress?.(ev);
  }
  const Trigger = asChild ? Slot.Pressable : Pressable;
  return <Trigger onPress={handleOnPress} {...props} />;
}

const BOTTOM_SHEET_HEADER_HEIGHT = 60; // BottomSheetHeader height

function BottomSheetView({
  className,
  children,
  hadHeader = false,
  style,
  ...props
}: Omit<React.ComponentProps<typeof GBottomSheetView>, "style"> & {
  hadHeader?: boolean;
  style?: ViewStyle;
}) {
  const insets = useSafeAreaInsets();
  return (
    <GBottomSheetView
      style={[
        {
          paddingBottom:
            insets.bottom + (hadHeader ? BOTTOM_SHEET_HEADER_HEIGHT : 0),
        },
        style,
      ]}
      className={cn(`h-full px-4`, className)}
      {...props}
    >
      {children}
    </GBottomSheetView>
  );
}

function BottomSheetTextInput({
  className,
  placeholderClassName,
  ...props
}: React.ComponentProps<typeof GBottomSheetTextInput>) {
  return (
    <GBottomSheetTextInput
      className={cn(
        "h-14 items-center rounded-md border border-input bg-background px-3 text-xl leading-[1.25] text-foreground placeholder:text-muted-foreground disabled:opacity-50",
        className,
      )}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      {...props}
    />
  );
}

function BottomSheetFlatList({
  className,
  ...props
}: React.ComponentProps<typeof GBottomSheetFlatList>) {
  const insets = useSafeAreaInsets();
  return (
    <GBottomSheetFlatList
      contentContainerStyle={[{ paddingBottom: insets.bottom }]}
      className={cn("py-4", className)}
      keyboardShouldPersistTaps="handled"
      {...props}
    />
  );
}

function BottomSheetHeader({
  className,
  children,
  ...props
}: React.ComponentProps<typeof View>) {
  const { dismiss } = useBottomSheetModal();
  function close() {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    dismiss();
  }
  return (
    <View
      className={cn("flex-row items-center justify-between pl-4", className)}
      {...props}
    >
      {children}
      <Button onPress={close} variant="ghost" className="pr-4">
        <Icons.X className="text-muted-foreground" size={20} />
      </Button>
    </View>
  );
}

/**
 * To be used in a useCallback function as a props to BottomSheetContent
 */
function BottomSheetFooter({
  bottomSheetFooterProps,
  children,
  className,
  style,
  ...props
}: Omit<React.ComponentProps<typeof View>, "style"> & {
  bottomSheetFooterProps: GBottomSheetFooterProps;
  children?: React.ReactNode;
  style?: ViewStyle;
}) {
  const insets = useSafeAreaInsets();
  return (
    <GBottomSheetFooter {...bottomSheetFooterProps}>
      <View
        style={[{ paddingBottom: insets.bottom + 6 }, style]}
        className={cn("px-4 pt-1.5", className)}
        {...props}
      >
        {children}
      </View>
    </GBottomSheetFooter>
  );
}

function useBottomSheet() {
  const ref = React.useRef<BottomSheetContentRef>(null);

  const open = React.useCallback(() => {
    ref.current?.present();
  }, []);

  const close = React.useCallback(() => {
    ref.current?.dismiss();
  }, []);

  return { ref, open, close };
}

export {
  BottomSheet,
  BottomSheetCloseTrigger,
  BottomSheetContent,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetTextInput,
  BottomSheetView,
  type BottomSheetContentRef,
  useBottomSheet,
};
