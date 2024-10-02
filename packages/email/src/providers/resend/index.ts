import { config } from "../../config";
import { env } from "../../env";
import { EmailProvider } from "../../types";

import type { EmailProviderStrategy } from "../types";

const { from } = config;

const send: EmailProviderStrategy["send"] = async ({
  to,
  subject,
  html,
  text,
}) => {
  if (env.EMAIL_PROVIDER !== EmailProvider.RESEND) {
    throw new Error(
      `Invalid email provider! Expected ${EmailProvider.RESEND}, got ${env.EMAIL_PROVIDER}.`,
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    console.error(await response.json());
    throw new Error("Could not send email!");
  }
};

export const resendStrategy: EmailProviderStrategy = {
  send,
};
