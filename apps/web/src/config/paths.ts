const AUTH_PREFIX = "/auth";
const BLOG_PREFIX = "/blog";
const DASHBOARD_PREFIX = "/dashboard";
const LEGAL_PREFIX = "/legal";

const API_PREFIX = "/api";

const pathsConfig = {
  index: "/",
  marketing: {
    pricing: "/pricing",
    contact: "/contact",
    blog: {
      index: BLOG_PREFIX,
      post: (slug: string) => `${BLOG_PREFIX}/${slug}`,
    },
    legal: (slug: string) => `${LEGAL_PREFIX}/${slug}`,
  },
  auth: {
    login: `${AUTH_PREFIX}/login`,
    register: `${AUTH_PREFIX}/register`,
    forgotPassword: `${AUTH_PREFIX}/password/forgot`,
    updatePassword: `${AUTH_PREFIX}/password/update`,
    error: `${AUTH_PREFIX}/error`,
  },
  dashboard: {
    index: DASHBOARD_PREFIX,
    ai: `${DASHBOARD_PREFIX}/ai`,
    settings: {
      index: `${DASHBOARD_PREFIX}/settings`,
      security: `${DASHBOARD_PREFIX}/settings/security`,
      billing: `${DASHBOARD_PREFIX}/settings/billing`,
    },
  },
} as const;

export {
  pathsConfig,
  DASHBOARD_PREFIX,
  BLOG_PREFIX,
  AUTH_PREFIX,
  API_PREFIX,
  LEGAL_PREFIX,
};
