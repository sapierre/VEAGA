import { APP_NAME } from "@turbostarter/shared";
import { BuiltWith } from "@turbostarter/ui/web";

export const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
      <p className="text-muted-foreground">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
      <BuiltWith />
    </footer>
  );
};
