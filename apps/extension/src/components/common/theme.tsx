import { useStorage } from "@plasmohq/storage/hook";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  ThemeStatus,
  ThemeCustomizer,
} from "@turbostarter/ui/web";

import type { ThemeConfig } from "@turbostarter/ui";

import { appConfig } from "~config/app";
import { STORAGE_KEY } from "~lib/storage";

const Customizer = () => {
  const [config, setConfig] = useStorage<ThemeConfig>(STORAGE_KEY.THEME);

  if (!config) {
    return null;
  }

  return (
    <ThemeCustomizer
      options={appConfig.theme.options}
      defaultConfig={appConfig.theme.default}
      config={config}
      onChange={(config) => setConfig(config)}
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
