import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import { Icons } from "@turbostarter/ui-web/icons";

import { HeaderControls } from "~/components/common/layout/header/controls";
import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

const LINKS = [
  {
    title: "Auth",
    description:
      "Authenticate users to your app. Social logins, magic link, email/password and many more.",
    href: pathsConfig.auth.login,
  },
  {
    title: "AI",
    description:
      "Integrate AI into your app. Image recognition, chatbots, and more.",
    href: pathsConfig.ai,
  },
  {
    title: "Billing",
    description:
      "Receive payments from your users using configured providers - Stripe or LemonSqueezy.",
    href: pathsConfig.marketing.pricing,
  },
  {
    title: "Blog",
    description:
      "Manage your blog with ease with built-in integration. Supports MDX and content collections.",
    href: pathsConfig.marketing.blog.index,
  },
  {
    title: "Themes",
    description:
      "Change the look and feel of your app. Light, dark, or custom themes.",
    href: "https://www.turbostarter.dev/docs/web/customization/styling",
  },
  {
    title: "Docs",
    description: `Learn how to use TurboStarter. From installation to deployment.`,
    href: "https://www.turbostarter.dev/docs/web",
  },
];

const HomePage = () => {
  return (
    <main className="flex w-full grow flex-col items-center justify-between gap-20">
      <div className="flex w-full flex-col items-center justify-between gap-3 md:flex-row-reverse">
        <HeaderControls />
        <p className="w-full rounded-md border border-input bg-muted/25 px-6 py-3 text-center md:w-fit">
          Edit{" "}
          <code className="rounded-md bg-muted px-2 py-0.5 font-mono">
            app/page.tsx
          </code>{" "}
          and save to reload.
        </p>
      </div>
      <Icons.Logo className="h-36 animate-pulse text-primary" />
      <div className="grid grid-cols-1 items-stretch justify-center gap-3 sm:grid-cols-2 md:-mb-4 md:grid-cols-3 lg:-mb-14">
        {LINKS.map((link) => (
          <TurboLink
            href={link.href}
            className="group w-full cursor-pointer"
            key={link.title}
          >
            <Card className="h-full transition-colors group-hover:bg-muted">
              <CardHeader>
                <CardTitle className="text-balance">
                  {link.title}
                  <Icons.ArrowRight className="ml-1 inline-block size-5 transition-transform group-hover:translate-x-1.5" />
                </CardTitle>
                <CardDescription className="text-pretty">
                  {link.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </TurboLink>
        ))}
      </div>
    </main>
  );
};

export default HomePage;
