import { BuiltWith } from "@turbostarter/ui/web";

import { appConfig } from "~/config/app";

export const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
      <p className="text-muted-foreground">
        &copy; {new Date().getFullYear()} {appConfig.name}. All rights reserved.
      </p>
      <BuiltWith href={appConfig.link} />
    </footer>
  );
};
