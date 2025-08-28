import { getTranslation } from "@turbostarter/i18n/server";
import { Icons } from "@turbostarter/ui-web/icons";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = await getTranslation({ ns: "common" });

  return (
    <main className="grid h-full w-full flex-1 lg:grid-cols-2">
      <section className="flex h-full flex-col items-center justify-center p-6 lg:p-10">
        <header className="text-navy -mt-1 mb-auto flex self-start justify-self-start">
          <TurboLink
            href={pathsConfig.index}
            className="flex shrink-0 items-center gap-3"
            aria-label={t("home")}
          >
            <Icons.Logo className="h-8 text-primary" />
            <Icons.LogoText className="h-4 text-foreground" />
          </TurboLink>
        </header>
        {children}
      </section>

      <aside className="hidden flex-1 bg-muted lg:block"></aside>
    </main>
  );
}
