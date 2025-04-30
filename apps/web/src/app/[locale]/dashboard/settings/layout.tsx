import { getTranslation } from "@turbostarter/i18n/server";

import { SettingsNav } from "~/components/dashboard/settings/layout/nav";
import { pathsConfig } from "~/config/paths";

const LINKS = [
  {
    label: "general",
    href: pathsConfig.dashboard.settings.index,
  },
  {
    label: "security",
    href: pathsConfig.dashboard.settings.security,
  },
  {
    label: "billing",
    href: pathsConfig.dashboard.settings.billing,
  },
] as const;

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = await getTranslation({ ns: ["common", "auth"] });

  return (
    <div className="flex w-full flex-col gap-6">
      <header className="flex items-center justify-between gap-10 py-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">
            {t("account.settings.header.title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("account.settings.header.description")}
          </p>
        </div>

        <div className="lg:hidden">
          <SettingsNav
            links={LINKS.map((link) => ({
              ...link,
              label: t(link.label),
            }))}
          />
        </div>
      </header>
      <div className="flex gap-3">
        <div className="hidden w-96 lg:block">
          <div className="sticky top-6">
            <SettingsNav
              links={LINKS.map((link) => ({
                ...link,
                label: t(link.label),
              }))}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
