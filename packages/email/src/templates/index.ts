import { render } from "@react-email/render";

import { EmailTemplate } from "../types";

import ChangeEmail from "./auth/change-email";
import { ConfirmEmail } from "./auth/confirm-email";
import DeleteAccount from "./auth/delete-account";
import { MagicLink } from "./auth/magic-link";
import { ResetPassword } from "./auth/reset-password";
import ContactForm from "./contact-form";

import type { EmailVariables } from "../types";

interface EmailTemplateComponent<T extends EmailTemplate> {
  (props: EmailVariables[T]): React.ReactElement;
  subject: string;
}

export const templates: {
  [K in EmailTemplate]: EmailTemplateComponent<K>;
} = {
  [EmailTemplate.RESET_PASSWORD]: ResetPassword,
  [EmailTemplate.MAGIC_LINK]: MagicLink,
  [EmailTemplate.CONFIRM_EMAIL]: ConfirmEmail,
  [EmailTemplate.DELETE_ACCOUNT]: DeleteAccount,
  [EmailTemplate.CHANGE_EMAIL]: ChangeEmail,
  [EmailTemplate.CONTACT_FORM]: ContactForm,
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
