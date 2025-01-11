import { Suspense } from "react";

import { cn } from "@turbostarter/ui";
import { buttonVariants } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { ThemeControls } from "~/components/common/theme";
import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { getSession } from "~/lib/auth/server";

export const HeaderControls = () => {
  return (
    <div className="flex items-center gap-3">
      <ThemeControls />
      <UserControls />
    </div>
  );
};

const UserControlsContent = async () => {
  const { session } = await getSession();

  return (
    <TurboLink
      href={session ? pathsConfig.dashboard.index : pathsConfig.auth.login}
      className={cn(
        buttonVariants({
          variant: "outline",
          size: "icon",
        }),
        "rounded-full",
      )}
    >
      {session ? (
        <>
          <Icons.Home className="size-4" />
          <div className="sr-only">Dashboard</div>
        </>
      ) : (
        <>
          <Icons.LogIn className="size-4" />
          <div className="sr-only">Log in</div>
        </>
      )}
    </TurboLink>
  );
};

const UserControls = () => {
  return (
    <Suspense fallback={<Skeleton className="size-10 rounded-full" />}>
      <UserControlsContent />
    </Suspense>
  );
};
