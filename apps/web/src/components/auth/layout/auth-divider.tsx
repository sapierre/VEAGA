"use client";

import { useTranslation } from "@turbostarter/i18n";

export const AuthDivider = () => {
  const { t } = useTranslation("auth");

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-input" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-background px-2 leading-tight text-muted-foreground">
          {t("divider")}
        </span>
      </div>
    </div>
  );
};
