import { getTranslation } from "@turbostarter/i18n/server";
import { BuiltWith } from "@turbostarter/ui-web/built-with";

import { TurboLink } from "~/components/common/turbo-link";
import { appConfig } from "~/config/app";
import { pathsConfig } from "~/config/paths";

export const Footer = async () => {
  const { t } = await getTranslation({ ns: "common" });

  return (
    <footer className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row-reverse sm:justify-between">
      <BuiltWith />

      <div className="flex flex-col items-center gap-0.5 sm:items-start">
        <p className="text-center text-muted-foreground sm:text-left">
          &copy; {new Date().getFullYear()} {appConfig.name}.{" "}
          {t("legal.copyright")}.
        </p>

        <div className="flex gap-2 text-sm text-muted-foreground">
          <TurboLink
            href={pathsConfig.marketing.legal("privacy-policy")}
            className="transition-colors hover:text-foreground"
          >
            {t("legal.privacy")}
          </TurboLink>
          <span>•</span>
          <TurboLink
            href={pathsConfig.marketing.legal("terms-and-conditions")}
            className="transition-colors hover:text-foreground"
          >
            {t("legal.terms")}
          </TurboLink>
        </div>
      </div>
    </footer>
  );
};
