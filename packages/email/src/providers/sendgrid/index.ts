import { env } from "../../env";
import { EmailProvider } from "../../types";

import type { EmailProviderStrategy } from "../types";

const from = env.EMAIL_FROM;

const send: EmailProviderStrategy["send"] = async ({
  to,
  subject,
  html,
  text,
}) => {
  if (env.EMAIL_PROVIDER !== EmailProvider.SENDGRID) {
    throw new Error(
      `Invalid email provider! Expected ${EmailProvider.SENDGRID}, got ${env.EMAIL_PROVIDER}.`,
    );
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      from: { email: from },
      personalizations: [
        {
          to: [{ email: to }],
        },
      ],
      subject,
      content: [
        {
          type: "text/plain",
          value: text,
        },
        {
          type: "text/html",
          value: html,
        },
      ],
    }),
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error("Could not send email!");
  }
};

export const sendgridStrategy: EmailProviderStrategy = {
  send,
};
