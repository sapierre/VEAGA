const SETUP_PREFIX = "/setup";
const DASHBOARD_PREFIX = "/dashboard";

const AUTH_PREFIX = `${SETUP_PREFIX}/auth`;
const SETTINGS_PREFIX = `${DASHBOARD_PREFIX}/settings`;

const pathsConfig = {
  index: "/",
  setup: {
    index: SETUP_PREFIX,
    auth: {
      login: `${AUTH_PREFIX}/login`,
      register: `${AUTH_PREFIX}/register`,
      forgotPassword: `${AUTH_PREFIX}/password/forgot`,
      updatePassword: `${AUTH_PREFIX}/password/update`,
      error: `${AUTH_PREFIX}/error`,
    },
    steps: {
      start: `${SETUP_PREFIX}/start`,
      required: `${SETUP_PREFIX}/required`,
      skip: `${SETUP_PREFIX}/skip`,
      final: `${SETUP_PREFIX}/final`,
    },
  },
  dashboard: {
    index: DASHBOARD_PREFIX,
    billing: `${DASHBOARD_PREFIX}/billing`,
    ai: `${DASHBOARD_PREFIX}/ai`,
    settings: {
      index: SETTINGS_PREFIX,
      general: {
        index: `${SETTINGS_PREFIX}/general`,
        notifications: `${SETTINGS_PREFIX}/general/notifications`,
      },
      account: {
        index: `${SETTINGS_PREFIX}/account`,
        name: `${SETTINGS_PREFIX}/account/name`,
        email: `${SETTINGS_PREFIX}/account/email`,
        password: `${SETTINGS_PREFIX}/account/password`,
        accounts: `${SETTINGS_PREFIX}/account/accounts`,
        twoFactor: `${SETTINGS_PREFIX}/account/two-factor`,
      },
      billing: `${SETTINGS_PREFIX}/billing`,
    },
  },
} as const;

export { pathsConfig, AUTH_PREFIX, SETUP_PREFIX, DASHBOARD_PREFIX };
