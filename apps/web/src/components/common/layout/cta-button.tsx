"use client";

import { useTranslation } from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";
import { buttonVariants } from "@turbostarter/ui-web/button";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { useSession } from "~/lib/auth/client";

export const CtaButton = (
  props: Omit<React.ComponentProps<typeof TurboLink>, "href">,
) => {
  const { t } = useTranslation(["common", "marketing"]);
  const { data } = useSession();

  return (
    <TurboLink
      {...props}
      href={
        data?.session ? pathsConfig.dashboard.index : pathsConfig.auth.login
      }
      className={cn(buttonVariants(), props.className)}
    >
      {!data?.session ? t("cta.button") : t("common:dashboard")}
    </TurboLink>
  );
};
