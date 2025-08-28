"use client";

import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-web/icons";

import { CtaButton } from "~/components/common/layout/cta-button";
import { ThemeControls } from "~/components/common/theme";
import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

import { MobileNavigation } from "./navigation/mobile-navigation";
import { Navigation } from "./navigation/navigation";

const links = [
  {
    label: "product",
    items: [
      {
        title: "marketing:product.mobile.ios.title",
        description: "marketing:product.mobile.ios.description",
        href: "https://turbostarter.dev",
        icon: Icons.Apple,
      },
      {
        title: "marketing:product.mobile.android.title",
        description: "marketing:product.mobile.android.description",
        href: "https://turbostarter.dev",
        icon: Icons.Android,
      },
      {
        title: "marketing:product.extension.chrome.title",
        description: "marketing:product.extension.chrome.description",
        href: "https://chromewebstore.google.com/detail/bcjmonmlfbnngpkllpnpmnjajaciaboo",
        icon: Icons.Chrome,
      },
      {
        title: "marketing:product.extension.firefox.title",
        description: "marketing:product.extension.firefox.description",
        href: "https://addons.mozilla.org/addon/turbostarter_",
        icon: Icons.Firefox,
      },
      {
        title: "marketing:product.extension.edge.title",
        description: "marketing:product.extension.edge.description",
        href: "https://microsoftedge.microsoft.com/addons/detail/turbostarter/ianbflanmmoeleokihabnmmcahhfijig",
        icon: Icons.Edge,
      },
    ],
  },
  {
    label: "resources",
    items: [
      {
        title: "marketing:contact.label",
        description: "marketing:contact.description",
        href: pathsConfig.marketing.contact,
        icon: Icons.SendHorizontal,
      },
      {
        title: "marketing:roadmap.title",
        description: "marketing:roadmap.description",
        href: "https://github.com/orgs/turbostarter/projects/1",
        icon: Icons.ChartNoAxesGantt,
      },
      {
        title: "marketing:docs.title",
        description: "marketing:docs.description",
        href: "https://turbostarter.dev/docs/web",
        icon: Icons.BookOpen,
      },
      {
        title: "marketing:api.title",
        description: "marketing:api.description",
        href: "#",
        icon: Icons.Webhook,
      },
    ],
  },
  {
    label: "billing:pricing.label",
    href: pathsConfig.marketing.pricing,
  },
  {
    label: "marketing:blog.label",
    href: pathsConfig.marketing.blog.index,
  },
] as const;

export const Header = () => {
  const { t } = useTranslation("common");
  return (
    <header className="sticky inset-0 z-40 w-full bg-background/80 py-3 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 pr-4 sm:container">
        <TurboLink
          href={pathsConfig.index}
          className="flex shrink-0 items-center gap-3"
          aria-label={t("home")}
        >
          <Icons.Logo className="h-8 text-primary" />
          <Icons.LogoText className="h-4 text-foreground" />
        </TurboLink>

        <Navigation links={links} />

        <div className="flex items-center justify-center lg:gap-2">
          <ThemeControls />
          <CtaButton className="hidden lg:inline-flex" />
          <MobileNavigation links={links} />
        </div>
      </div>
    </header>
  );
};
