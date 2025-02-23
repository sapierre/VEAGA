const AUTH_PREFIX = "/auth";
const SETTINGS_PREFIX = "/settings";
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
    settings: {
      index: SETTINGS_PREFIX,
      general: `${SETTINGS_PREFIX}/general`,
      notifications: `${SETTINGS_PREFIX}/notifications`,
      account: {
        index: `${SETTINGS_PREFIX}/account`,
        name: `${SETTINGS_PREFIX}/account/name`,
        email: `${SETTINGS_PREFIX}/account/email`,
        password: `${SETTINGS_PREFIX}/account/password`,
        accounts: `${SETTINGS_PREFIX}/account/accounts`,
      },
    },
  },
} as const;

export { pathsConfig };
