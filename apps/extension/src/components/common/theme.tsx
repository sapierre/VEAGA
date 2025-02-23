import { useTranslation } from "@turbostarter/i18n";
import { Button } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@turbostarter/ui-web/popover";
import { ThemeCustomizer, ThemeStatus } from "@turbostarter/ui-web/theme";

import { appConfig } from "~/config/app";
import { StorageKey, useStorage } from "~/lib/storage";

const Customizer = () => {
  const { t } = useTranslation("common");
  const { data, set } = useStorage(StorageKey.THEME);

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
            set(appConfig.theme);
          }}
        >
          <Icons.Undo2 className="size-4" />
          <span className="sr-only">{t("reset")}</span>
        </Button>
      </div>
      <ThemeCustomizer
        defaultConfig={appConfig.theme}
        config={data}
        onChange={set}
      />
    </>
  );
};

export const ThemeControls = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ThemeStatus />
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="z-40 w-[21.5rem] rounded-lg p-6"
      >
        <Customizer />
      </PopoverContent>
    </Popover>
  );
};
