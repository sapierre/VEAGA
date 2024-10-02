import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { config } from "../config";
import { EmailProvider } from "../types";

const shared = {
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
} as const;

const getEmailEnv = (provider: EmailProvider) => {
  switch (provider) {
    case EmailProvider.RESEND:
      return createEnv({
        ...shared,
        server: {
          RESEND_API_KEY: z.string(),
          EMAIL_PROVIDER: z.literal(provider).optional().default(provider),
        },
      });
    case EmailProvider.PLUNK:
      return createEnv({
        ...shared,
        server: {
          PLUNK_API_KEY: z.string(),
          EMAIL_PROVIDER: z.literal(provider).optional().default(provider),
        },
      });
    case EmailProvider.POSTMARK:
      return createEnv({
        ...shared,
        server: {
          POSTMARK_API_KEY: z.string(),
          EMAIL_PROVIDER: z.literal(provider).optional().default(provider),
        },
      });
    case EmailProvider.NODEMAILER:
      return createEnv({
        ...shared,
        server: {
          NODEMAILER_HOST: z.string(),
          NODEMAILER_PORT: z.coerce.number(),
          NODEMAILER_USER: z.string(),
          NODEMAILER_PASSWORD: z.string(),
          EMAIL_PROVIDER: z.literal(provider).optional().default(provider),
        },
      });
    case EmailProvider.SENDGRID:
      return createEnv({
        ...shared,
        server: {
          SENDGRID_API_KEY: z.string(),
          EMAIL_PROVIDER: z.literal(provider).optional().default(provider),
        },
      });
    default:
      throw new Error(`Unsupported email provider!`);
  }
};

export const env = getEmailEnv(config.provider);
