import { getTranslation } from "@turbostarter/i18n/server";
import { isExternal } from "@turbostarter/shared/utils";
import { BuiltWith } from "@turbostarter/ui-web/built-with";
import { Icons } from "@turbostarter/ui-web/icons";

import { I18nControls } from "~/components/common/i18n/controls";
import { TurboLink } from "~/components/common/turbo-link";
import { appConfig } from "~/config/app";
import { pathsConfig } from "~/config/paths";

const socials = [
  {
    id: "x",
    href: "https://x.com/turbostarter_",
    icon: Icons.Twitter,
  },
  {
    id: "github",
    href: "https://github.com/turbostarter",
    icon: Icons.Github,
  },

  {
    id: "facebook",
    href: "#",
    icon: Icons.Facebook,
  },
  {
    id: "linkedin",
    href: "#",
    icon: Icons.Linkedin,
  },
];

const links = [
  {
    label: "common:product",
    items: [
      {
        title: "marketing:product.mobile.ios.title",
        href: "https://turbostarter.dev",
      },
      {
        title: "marketing:product.mobile.android.title",
        href: "https://turbostarter.dev",
      },
      {
        title: "marketing:product.extension.chrome.title",
        href: "https://chromewebstore.google.com/detail/bcjmonmlfbnngpkllpnpmnjajaciaboo",
      },
      {
        title: "marketing:product.extension.firefox.title",
        href: "https://addons.mozilla.org/addon/turbostarter_",
      },
      {
        title: "marketing:product.extension.edge.title",
        href: "https://microsoftedge.microsoft.com/addons/detail/turbostarter/ianbflanmmoeleokihabnmmcahhfijig",
      },
    ],
  },
  {
    label: "resources",
    items: [
      {
        title: "marketing:contact.label",
        href: pathsConfig.marketing.contact,
      },
      {
        title: "marketing:roadmap.title",
        href: "https://github.com/orgs/turbostarter/projects/1",
      },
      {
        title: "marketing:docs.title",
        href: "https://turbostarter.dev/docs/web",
      },
      {
        title: "marketing:api.title",
        href: "#",
      },
    ],
  },
  {
    label: "about",
    items: [
      {
        title: "billing:pricing.label",
        href: pathsConfig.marketing.pricing,
      },
      {
        title: "marketing:blog.label",
        href: pathsConfig.marketing.blog.index,
      },
    ],
  },
  {
    label: "legal.label",
    items: [
      {
        title: "legal.privacy",
        href: pathsConfig.marketing.legal("privacy-policy"),
      },
      {
        title: "legal.terms",
        href: pathsConfig.marketing.legal("terms-and-conditions"),
      },
    ],
  },
] as const;

export const Footer = async () => {
  const { t } = await getTranslation({
    ns: ["common", "marketing", "billing"],
  });

  return (
    <footer className="mt-auto w-full border-t px-6 pb-6 pt-8 sm:pb-8 sm:pt-10 md:pb-10 md:pt-14 lg:pt-16">
      <div className="sm:container">
        <div className="flex w-full flex-col items-start justify-between gap-10 md:gap-16 lg:flex-row lg:gap-24 xl:gap-32">
          <div className="flex flex-col items-start justify-center gap-2">
            <TurboLink
              href={pathsConfig.index}
              className="flex shrink-0 items-center gap-3"
              aria-label={t("home")}
            >
              <Icons.Logo className="h-8 text-primary" />
              <Icons.LogoText className="h-4 text-foreground" />
            </TurboLink>

            <p className="text-pretty text-sm text-muted-foreground">
              {t("product.title")}
            </p>

            <I18nControls />

            <div className="mt-2 flex items-center gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={social.id}
                >
                  <social.icon className="size-7" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-1 grid w-full max-w-[50rem] grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
            {links.map((link) => (
              <div className="flex w-full flex-col gap-4" key={link.label}>
                <span className="text-sm font-medium text-foreground">
                  {t(link.label)}
                </span>
                <nav>
                  <ul className="flex flex-col gap-2">
                    {link.items.map((link) => (
                      <li key={link.title}>
                        <TurboLink
                          href={link.href}
                          className="relative text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {t(link.title)}
                          {isExternal(link.href) && (
                            <Icons.ArrowUpRight className="-mt-1 inline size-2.5" />
                          )}
                        </TurboLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {appConfig.name}.{" "}
              {t("legal.copyright")}.
            </p>

            <BuiltWith />
          </div>
        </div>
      </div>
    </footer>
  );
};
