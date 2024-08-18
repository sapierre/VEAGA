"use client";

import { useTheme } from "next-themes";

import {
  ThemeCustomizer,
  ThemeStatus,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@turbostarter/ui/web";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
} from "~/components/common/drawer";
import { appConfig } from "~/config/app";
import { useBreakpoint } from "~/lib/hooks/use-media-query";
import { useThemeConfig } from "~/providers/theme";

import type { ThemeMode } from "@turbostarter/ui";

const Customizer = () => {
  const [config, setConfig] = useThemeConfig();
  const { setTheme: setMode, theme: mode } = useTheme();

  return (
    <ThemeCustomizer
      options={appConfig.theme.options}
      defaultConfig={appConfig.theme.default}
      config={{
        ...config,
        mode: (mode as ThemeMode | undefined) ?? appConfig.theme.default.mode,
      }}
      onChange={({ mode, ...config }) => {
        setMode(mode);
        setConfig(config);
      }}
    />
  );
};

export const ThemeControls = () => {
  const isDesktop = useBreakpoint("md");

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <ThemeStatus />
        </PopoverTrigger>
        <PopoverContent align="end" className="z-40 w-[22rem] rounded-lg p-6">
          <Customizer />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ThemeStatus />
      </DrawerTrigger>
      <DrawerContent className="p-6 pt-0">
        <div className="pt-4">
          <Customizer />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
