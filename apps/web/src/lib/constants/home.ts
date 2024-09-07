import { appConfig } from "~/config/app";
import { pathsConfig } from "~/config/paths";

export const HOME_LINKS = [
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
    href: "#",
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
    href: "",
  },
  {
    title: "Docs",
    description: `Learn how to use ${appConfig.name}. From installation to deployment.`,
    href: "https://www.turbostarter.dev/docs",
  },
];
