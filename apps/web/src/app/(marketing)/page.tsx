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
    title: "Admin",
    description:
      "Interactive dashboard for managing your account, analytics, settings and other app features.",
    href: pathsConfig.dashboard.index,
  },
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
    href: pathsConfig.dashboard.ai,
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
    title: "Docs",
    description: `Learn how to use TurboStarter. From installation to deployment.`,
    href: "https://www.turbostarter.dev/docs/web",
  },
];

const HomePage = () => {
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
