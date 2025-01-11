const AUTH_PREFIX = "/auth";

const pathsConfig = {
  index: "/",
  tabs: {
    auth: {
      login: `${AUTH_PREFIX}/login`,
      register: `${AUTH_PREFIX}/register`,
      forgotPassword: `${AUTH_PREFIX}/password/forgot`,
      updatePassword: `${AUTH_PREFIX}/password/update`,
      error: `${AUTH_PREFIX}/error`,
    },
    billing: `/billing`,
    ai: `/ai`,
    settings: `/settings`,
  },
} as const;

export { pathsConfig };
