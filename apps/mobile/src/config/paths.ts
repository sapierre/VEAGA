const TABS_PREFIX = "(tabs)";

const pathsConfig = {
  index: "/",
  tabs: {
    auth: `${TABS_PREFIX}/auth`,
    billing: `${TABS_PREFIX}/billing`,
    blog: `${TABS_PREFIX}/blog`,
  },
} as const;

export { pathsConfig, TABS_PREFIX };
