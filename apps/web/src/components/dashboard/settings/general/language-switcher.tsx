"use client";

import { useTranslation } from "@turbostarter/i18n";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";

import { I18nControls } from "~/components/common/i18n/controls";

export const LanguageSwitcher = () => {
  const { t } = useTranslation("common");

  return (
    <Card className="h-fit w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">{t("language.label")}</CardTitle>
        <CardDescription className="flex flex-col gap-1 pb-1.5 text-foreground">
          {t("language.description")}
        </CardDescription>

        <div className="max-w-xs">
          <I18nControls />
        </div>
      </CardHeader>

      <CardFooter className="flex min-h-14 justify-between gap-10 border-t bg-muted/75 py-3 text-sm text-muted-foreground dark:bg-card">
        <span className="leading-tight">{t("language.info")}</span>
      </CardFooter>
    </Card>
  );
};
