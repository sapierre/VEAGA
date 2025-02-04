"use client";

import * as React from "react";
import { forwardRef, memo } from "react";
import { useTranslation } from "react-i18next";

import { ThemeColor, ThemeMode } from "@turbostarter/ui";
import { cn } from "@turbostarter/ui";

import type { ThemeConfig } from "@turbostarter/ui";

import { Button } from "#components/button";
import { Icons } from "#components/icons";
import { Label } from "#components/label";

interface ThemeCustomizerProps {
  readonly config: ThemeConfig;
  readonly defaultConfig?: ThemeConfig;
  readonly onChange: (config: ThemeConfig) => void;
}

const MODE_ICONS = {
  [ThemeMode.LIGHT]: Icons.Sun,
  [ThemeMode.DARK]: Icons.Moon,
  [ThemeMode.SYSTEM]: Icons.SunMoon,
} as const;

export const ThemeStatus = forwardRef<HTMLButtonElement>((props, ref) => {
  const { t } = useTranslation("common");

  return (
    <Button
      variant="outline"
      className="rounded-full bg-transparent"
      ref={ref}
      {...props}
    >
      <span className="sr-only">{t("theme.customization.label")}</span>
      <div className="flex items-center justify-center gap-2">
        <div className="size-4 rounded-full bg-primary"></div>
        <Icons.Sun className="size-[1.2rem] dark:hidden" />
        <Icons.Moon className="hidden size-[1.2rem] dark:block" />
      </div>
    </Button>
  );
});

export const ThemeCustomizer = memo<ThemeCustomizerProps>(
  ({ config, defaultConfig, onChange }) => {
    const { t } = useTranslation("common");
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
          {defaultConfig && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-[0.5rem]"
              onClick={() => {
                onChange(defaultConfig);
              }}
            >
              <Icons.Undo2 className="size-4" />
              <span className="sr-only">{t("reset")}</span>
            </Button>
          )}
        </div>
        <div className="mt-2 flex flex-1 flex-col items-center space-y-4 md:space-y-6">
          <div className="w-full space-y-1.5">
            <Label className="text-xs">{t("theme.color.label")}</Label>
            <div className="flex flex-wrap gap-2">
              {Object.values(ThemeColor)
                .filter((color) => Object.values(ThemeColor).includes(color))
                .map((color) => {
                  const isActive = config.color === color;

                  return (
                    <Button
                      variant={"outline"}
                      size="sm"
                      key={color}
                      onClick={() => onChange({ ...config, color })}
                      className={cn(
                        "grow basis-[85px] justify-start text-xs capitalize",
                        isActive && "border-2 border-primary",
                      )}
                    >
                      <span
                        data-theme={color}
                        className={cn(
                          "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full border border-white bg-primary",
                        )}
                      ></span>
                      {t(`theme.color.${color}`)}
                    </Button>
                  );
                })}
            </div>
          </div>
          <div className="w-full space-y-1.5">
            <Label className="text-xs">{t("theme.mode.label")}</Label>
            <div className="flex flex-wrap gap-2">
              {Object.values(ThemeMode).map((mode) => {
                const isActive = config.mode === mode;
                const Icon = MODE_ICONS[mode];

                return (
                  <Button
                    variant="outline"
                    key={mode}
                    size="sm"
                    onClick={() => onChange({ ...config, mode })}
                    className={cn(
                      "grow basis-[85px] justify-start text-xs capitalize",
                      isActive && "border-2 border-primary",
                    )}
                  >
                    <Icon className="mr-1 size-5 shrink-0 -translate-x-1" />
                    {t(`theme.mode.${mode}`)}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  },
);

ThemeCustomizer.displayName = "ThemeCustomizer";
