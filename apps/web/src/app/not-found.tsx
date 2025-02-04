import { Trans } from "@turbostarter/i18n";
import { getTranslation } from "@turbostarter/i18n/server";

import { BaseLayout } from "~/components/common/layout/base";
import { TurboLink } from "~/components/common/turbo-link";
import { appConfig } from "~/config/app";
import { pathsConfig } from "~/config/paths";

export default async function NotFound() {
  const { t } = await getTranslation({ ns: ["common"] });

  return (
    <BaseLayout locale={appConfig.locale}>
      <main className="mx-auto flex max-w-xl flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="mt-4 text-4xl font-bold">{t("error.notFound")}</h1>
          <p className="text-pretty text-center text-lg leading-tight">
            <Trans
              t={t}
              i18nKey="editToReload"
              values={{
                file: "src/app/[lang]/not-found.tsx",
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
    </BaseLayout>
  );
}
