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
  if (env.EMAIL_PROVIDER !== EmailProvider.PLUNK) {
    throw new Error(
      `Invalid email provider! Expected ${EmailProvider.PLUNK}, got ${env.EMAIL_PROVIDER}.`,
    );
  }

  const response = await fetch("https://api.useplunk.com/v1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.PLUNK_API_KEY}`,
    },
    body: JSON.stringify({
      to,
      from,
      subject,
      body: html,
      text,
    }),
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error("Could not send email!");
  }
};

export const plunkStrategy: EmailProviderStrategy = {
  send,
};
