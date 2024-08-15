import { Logo } from "@turbostarter/ui";

import { ThemeSwitch } from "~/components/common/theme-switch";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between">
      <Logo withText asLink />
      <ThemeSwitch />
    </header>
  );
};
