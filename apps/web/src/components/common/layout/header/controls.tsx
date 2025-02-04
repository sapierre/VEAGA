import { Suspense } from "react";

import { getTranslation } from "@turbostarter/i18n/server";
import { cn } from "@turbostarter/ui";
import { buttonVariants } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { I18nControls } from "~/components/common/i18n/controls";
import { ThemeControls } from "~/components/common/theme";
import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { getSession } from "~/lib/auth/server";

export const HeaderControls = () => {
  return (
    <div className="flex items-center gap-3">
      <I18nControls />
      <ThemeControls />
      <UserControls />
    </div>
  );
};

const UserControlsContent = async () => {
  const { t } = await getTranslation({ ns: ["common", "auth"] });
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
          <div className="sr-only">{t("dashboard")}</div>
        </>
      ) : (
        <>
          <Icons.LogIn className="size-4" />
          <div className="sr-only">{t("login.cta")}</div>
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
