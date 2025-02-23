"use client";

import { useEffect } from "react";

import { Trans, useTranslation } from "@turbostarter/i18n";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

export default function Error({ error }: { error: Error }) {
  const { t } = useTranslation("common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-xl flex-1 items-center justify-center px-6">
      <div className="text-center">
        <h1 className="mt-4 text-4xl font-bold">{t("error.general")}</h1>
        <p className="text-pretty text-center text-lg leading-tight">
          <Trans
            i18nKey="editToReload"
            t={t}
            values={{
              file: "src/app/[lang]/error.tsx",
            }}
            components={{
              code: (
                <code className="mt-4 inline-block rounded-sm bg-muted px-1.5 text-sm text-muted-foreground" />
              ),
            }}
          />
        </p>
        <TurboLink
          href={pathsConfig.index}
          className="mt-6 inline-block text-primary underline hover:no-underline"
        >
          {t("goBackHome")}
        </TurboLink>
      </div>
    </main>
  );
}
