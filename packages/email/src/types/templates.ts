export interface CommonEmailProps {
  readonly locale?: string;
}

const AuthEmailTemplate = {
  RESET_PASSWORD: "reset-password",
  MAGIC_LINK: "magic-link",
  CONFIRM_EMAIL: "confirm-email",
  DELETE_ACCOUNT: "delete-account",
  CHANGE_EMAIL: "change-email",
} as const;

export const EmailTemplate = {
  ...AuthEmailTemplate,
  CONTACT_FORM: "contact-form",
} as const;

type AuthEmailTemplate =
  (typeof AuthEmailTemplate)[keyof typeof AuthEmailTemplate];

export type AuthEmailVariables = Record<
  Exclude<AuthEmailTemplate, "magic-link">,
  {
    url: string;
  }
>;

export interface ContactFormEmailVariables {
  name: string;
  email: string;
  message: string;
}

export type EmailTemplate = (typeof EmailTemplate)[keyof typeof EmailTemplate];
export type EmailVariables = AuthEmailVariables & {
  [EmailTemplate.MAGIC_LINK]: {
    url: string;
    token: string;
  };
  [EmailTemplate.CONTACT_FORM]: ContactFormEmailVariables;
};
