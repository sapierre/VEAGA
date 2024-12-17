import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@turbostarter/ui-web/popover";
import { ThemeCustomizer, ThemeStatus } from "@turbostarter/ui-web/theme";

import { appConfig } from "~/config/app";
import { StorageKey, useStorage } from "~/lib/storage";

const Customizer = () => {
  const { data, set } = useStorage(StorageKey.THEME);

  return (
    <ThemeCustomizer
      defaultConfig={appConfig.theme}
      config={data}
      onChange={(config) => set(config)}
    />
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
