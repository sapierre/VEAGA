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
  if (env.EMAIL_PROVIDER !== EmailProvider.POSTMARK) {
    throw new Error(
      `Invalid email provider! Expected ${EmailProvider.POSTMARK}, got ${env.EMAIL_PROVIDER}.`,
    );
  }

  const response = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": env.POSTMARK_API_KEY,
    },
    body: JSON.stringify({
      From: from,
      To: to,
      Subject: subject,
      HtmlBody: html,
      TextBody: text,
    }),
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error("Could not send email!");
  }
};

export const postmarkStrategy: EmailProviderStrategy = {
  send,
};
