import { appConfig } from "~/config/app";
import { pathsConfig } from "~/config/paths";

export const HOME_LINKS = [
  {
    title: "Auth",
    description:
      "Check how to use the auth flow. Social logins, magic link, email/password and many more.",
    href: pathsConfig.auth.login,
  },
  {
    title: "Admin",
    description:
      "Admin dashboard with restricted access, CRUD operations, feature-based access and more.",
    href: "#",
  },
  {
    title: "Billing",
    description:
      "Receive payments from your users using configured providers - Stripe or LemonSqueezy.",
    href: pathsConfig.pricing,
  },
  {
    title: "Themes",
    description:
      "Change the look and feel of your app. Light, dark, or custom themes.",
    href: "",
  },
  {
    title: "Analytics",
    description:
      "Track user behavior, page views, and more. Integrate with multiple providers.",
    href: "#",
  },
  {
    title: "Docs",
    description: `Learn how to use ${appConfig.name}. From installation to deployment.`,
    href: "#",
  },
];
