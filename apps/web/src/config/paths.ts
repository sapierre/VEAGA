const AUTH_PREFIX = "/auth";
const ADMIN_PREFIX = "/admin";
const API_PREFIX = "/api";

const pathsConfig = {
  index: "/",
  auth: {
    login: `${AUTH_PREFIX}/login`,
    register: `${AUTH_PREFIX}/register`,
    forgotPassword: `${AUTH_PREFIX}/password/forgot`,
    updatePassword: `${AUTH_PREFIX}/password/update`,
    error: `${AUTH_PREFIX}/error`,
  },
  api: {
    auth: {
      callback: `${API_PREFIX}${AUTH_PREFIX}/callback`,
      confirm: `${API_PREFIX}${AUTH_PREFIX}/confirm`,
    },
  },
} as const;

export { pathsConfig, ADMIN_PREFIX, AUTH_PREFIX, API_PREFIX };
