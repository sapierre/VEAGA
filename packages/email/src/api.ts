import { config } from "./config";
import { strategies } from "./providers";
import { getTemplate } from "./templates";

import type { EmailTemplate, EmailVariables } from "./types";

const { provider } = config;

const sendEmail = async <T extends EmailTemplate>({
  to,
  template,
  variables,
}: {
  to: string;
  template: T;
  variables: EmailVariables[T];
}) => {
  const strategy = strategies[provider];
  const { html, text, subject } = await getTemplate({
    id: template,
    variables,
  });

  return strategy.send({ to, subject, html, text });
};

export { sendEmail };
