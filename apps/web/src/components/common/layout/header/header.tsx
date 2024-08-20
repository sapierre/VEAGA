import Link from "next/link";

import { Logo } from "@turbostarter/ui";

import { pathsConfig } from "~/config/paths";

import { HeaderControls } from "./controls";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between">
      <Link href={pathsConfig.index}>
        <Logo withText />
      </Link>

      <HeaderControls />
    </header>
  );
};
