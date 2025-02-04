"use client";

import * as React from "react";

import { useTranslation } from "@turbostarter/i18n";

import { buttonVariants } from "#components/button";
import { Icons } from "#components/icons";

export const BuiltWith = () => {
  const { t } = useTranslation("common");

  return (
    <a
      className={buttonVariants({
        variant: "outline",
        className: "cursor-pointer font-sans",
      })}
      href="https://www.turbostarter.dev"
      target="_blank"
    >
      {t("builtWith")}{" "}
      <div className="flex shrink-0 items-center gap-1.5">
        <Icons.Logo className="ml-1.5 h-4 text-primary" />
        <Icons.LogoText className="h-2.5 text-foreground" />
      </div>
    </a>
  );
};
