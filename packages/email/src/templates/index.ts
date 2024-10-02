import { render } from "@react-email/render";

import { EmailTemplate } from "../types";

import { ConfirmEmail } from "./auth/confirm-email";
import { MagicLink } from "./auth/magic-link";
import { ResetPassword } from "./auth/reset-password";

import type { EmailVariables } from "../types";

export const templates = {
  [EmailTemplate.RESET_PASSWORD]: ResetPassword,
  [EmailTemplate.MAGIC_LINK]: MagicLink,
  [EmailTemplate.CONFIRM_EMAIL]: ConfirmEmail,
} as const;

export const getTemplate = async <T extends EmailTemplate>({
  id,
  variables,
}: {
  id: T;
  variables: EmailVariables[T];
}) => {
  const template = templates[id];
  const subject = template.subject;
  const email = template(variables);

  const html = await render(email);
  const text = await render(email, { plainText: true });

  return { html, text, subject };
};
