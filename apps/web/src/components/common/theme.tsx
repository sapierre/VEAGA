"use client";

import { useTheme } from "next-themes";

import { track } from "@turbostarter/analytics-web";
import { useTranslation } from "@turbostarter/i18n";
import { useBreakpoint } from "@turbostarter/ui-web";
import { Button } from "@turbostarter/ui-web/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
} from "@turbostarter/ui-web/drawer";
import { Icons } from "@turbostarter/ui-web/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverPortal,
} from "@turbostarter/ui-web/popover";
import { ThemeCustomizer } from "@turbostarter/ui-web/theme";

import { appConfig } from "~/config/app";
import { useThemeConfig } from "~/providers/theme";

import type { ThemeConfig, ThemeMode } from "@turbostarter/ui";

const Trigger = (props: React.ComponentProps<typeof Button>) => {
  const { t } = useTranslation("common");
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t("theme.customization.label")}
      {...props}
    >
      <Icons.PaintBucket className="size-5 text-primary" />
    </Button>
  );
};

const Customizer = () => {
  const { t } = useTranslation("common");
  const { config, setConfig } = useThemeConfig();
  const { setTheme: setMode, theme: mode } = useTheme();

  const onChange = (config: ThemeConfig) => {
    setConfig(config);
    setMode(config.mode);
  };

  return (
    <>
      <div className="flex items-start">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            {t("theme.customization.title")}
          </div>
          <div className="text-xs text-muted-foreground">
            {t("theme.customization.description")}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          onClick={() => {
            onChange(appConfig.theme);
            track("theme.customization.reset");
          }}
        >
          <Icons.Undo2 className="size-4" />
          <span className="sr-only">{t("reset")}</span>
        </Button>
      </div>
      <ThemeCustomizer
        defaultConfig={appConfig.theme}
        config={{
          ...config,
          mode: (mode as ThemeMode | undefined) ?? appConfig.theme.mode,
        }}
        onChange={onChange}
      />
    </>
  );
};

export const ThemeControlsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isDesktop = useBreakpoint("md");

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverPortal>
          <PopoverContent
            align="end"
            className="w-[22rem] rounded-lg p-6"
            onOpenAutoFocus={(event) => {
              event.preventDefault();
            }}
            onFocusOutside={(event) => {
              event.preventDefault();
            }}
          >
            <Customizer />
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="p-6 pt-0">
        <div className="pt-4">
          <Customizer />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const ThemeControls = () => {
  return (
    <ThemeControlsProvider>
      <Trigger />
    </ThemeControlsProvider>
  );
};
