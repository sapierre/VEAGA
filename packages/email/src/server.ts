import { env } from "./env";
import { strategies } from "./providers";
import { getTemplate } from "./templates";

import type { EmailTemplate, EmailVariables } from "./types";

const sendEmail = async <T extends EmailTemplate>({
  to,
  template,
  variables,
}: {
  to: string;
  template: T;
  variables: EmailVariables[T];
}) => {
  const strategy = strategies[env.EMAIL_PROVIDER];
  const { html, text, subject } = await getTemplate({
    id: template,
    variables,
  });

  return strategy.send({ to, subject, html, text });
};

export { sendEmail };
