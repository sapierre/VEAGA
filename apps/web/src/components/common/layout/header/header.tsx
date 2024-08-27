import { Logo } from "@turbostarter/ui";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

import { HeaderControls } from "./controls";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between">
      <TurboLink href={pathsConfig.index}>
        <Logo withText />
      </TurboLink>

      <HeaderControls />
    </header>
  );
};
