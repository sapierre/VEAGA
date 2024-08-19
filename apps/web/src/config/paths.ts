const AUTH_PREFIX = "/auth";
const ADMIN_PREFIX = "/admin";
const API_PREFIX = "/api";
const WEBHOOKS_PREFIX = "/webhooks";

const pathsConfig = {
  index: "/",
  pricing: "/pricing",
  auth: {
    login: `${AUTH_PREFIX}/login`,
    register: `${AUTH_PREFIX}/register`,
    forgotPassword: `${AUTH_PREFIX}/password/forgot`,
    updatePassword: `${AUTH_PREFIX}/password/update`,
    error: `${AUTH_PREFIX}/error`,
  },
  admin: {
    index: `${ADMIN_PREFIX}`,
  },
  api: {
    auth: {
      callback: `${API_PREFIX}${AUTH_PREFIX}/callback`,
      confirm: `${API_PREFIX}${AUTH_PREFIX}/confirm`,
    },
    webhooks: {
      billing: `${API_PREFIX}${WEBHOOKS_PREFIX}/billing`,
    },
  },
} as const;

export { pathsConfig, ADMIN_PREFIX, AUTH_PREFIX, API_PREFIX };
