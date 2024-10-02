import nodemailer from "nodemailer";

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
  if (env.EMAIL_PROVIDER !== EmailProvider.NODEMAILER) {
    throw new Error(
      `Invalid email provider! Expected ${EmailProvider.NODEMAILER}, got ${env.EMAIL_PROVIDER}.`,
    );
  }

  const transporter = nodemailer.createTransport({
    host: env.NODEMAILER_HOST,
    port: env.NODEMAILER_PORT,
    auth: {
      user: env.NODEMAILER_USER,
      pass: env.NODEMAILER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });
};

export const nodemailerStrategy: EmailProviderStrategy = {
  send,
};
