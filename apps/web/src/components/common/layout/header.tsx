import Link from "next/link";

import { Logo } from "@turbostarter/ui";

import { ThemeControls } from "~/components/common/theme";
import { pathsConfig } from "~/config/paths";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between">
      <Link href={pathsConfig.index}>
        <Logo withText />
      </Link>

      <ThemeControls />
    </header>
  );
};
