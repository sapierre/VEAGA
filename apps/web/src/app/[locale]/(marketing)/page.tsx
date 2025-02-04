import { getTranslation, withI18n } from "@turbostarter/i18n/server";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import { Icons } from "@turbostarter/ui-web/icons";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

const LINKS = [
  {
    title: "feature.admin.title",
    description: "feature.admin.description",
    href: pathsConfig.dashboard.index,
  },
  {
    title: "feature.auth.title",
    description: "feature.auth.description",
    href: pathsConfig.auth.login,
  },
  {
    title: "feature.ai.title",
    description: "feature.ai.description",
    href: pathsConfig.dashboard.ai,
  },
  {
    title: "feature.billing.title",
    description: "feature.billing.description",
    href: pathsConfig.marketing.pricing,
  },
  {
    title: "feature.blog.title",
    description: "feature.blog.description",
    href: pathsConfig.marketing.blog.index,
  },
  {
    title: "feature.docs.title",
    description: "feature.docs.description",
    href: "https://www.turbostarter.dev/docs/web",
  },
] as const;

const HomePage = async () => {
  const { t } = await getTranslation({ ns: "marketing" });

  return (
    <main className="flex w-full grow flex-col items-center justify-between gap-24 self-stretch">
      <div className="flex grow items-center justify-center pt-20">
        <Icons.Logo className="h-36 animate-pulse text-primary" />
      </div>
      <div className="grid grid-cols-1 items-stretch justify-center gap-3 sm:grid-cols-2 md:grid-cols-3">
        {LINKS.map((link) => (
          <TurboLink
            href={link.href}
            className="group w-full cursor-pointer"
            key={link.title}
          >
            <Card className="h-full transition-colors group-hover:bg-muted">
              <CardHeader>
                <CardTitle className="text-balance">
                  {t(link.title)}
                  <Icons.ArrowRight className="ml-1 inline-block size-5 transition-transform group-hover:translate-x-1.5" />
                </CardTitle>
                <CardDescription className="text-pretty">
                  {t(link.description)}
                </CardDescription>
              </CardHeader>
            </Card>
          </TurboLink>
        ))}
      </div>
    </main>
  );
};

export default withI18n(HomePage);
