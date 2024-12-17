const AuthEmailTemplate = {
  RESET_PASSWORD: "reset-password",
  MAGIC_LINK: "magic-link",
  CONFIRM_EMAIL: "confirm-email",
} as const;

export const EmailTemplate = {
  ...AuthEmailTemplate,
} as const;

type AuthEmailTemplate =
  (typeof AuthEmailTemplate)[keyof typeof AuthEmailTemplate];

export type AuthEmailVariables = Record<
  AuthEmailTemplate,
  {
    siteUrl: string;
    tokenHash: string;
    redirectTo?: string;
  }
>;

export type EmailTemplate = (typeof EmailTemplate)[keyof typeof EmailTemplate];
export type EmailVariables = AuthEmailVariables;
