import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import { ThemeColor } from "@turbostarter/ui";

import { EmailProvider } from "../types";

const shared = {
  skipValidation:
    (!!process.env.SKIP_ENV_VALIDATION &&
      ["1", "true"].includes(process.env.SKIP_ENV_VALIDATION)) ||
    process.env.npm_lifecycle_event === "lint",
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
} as const;

export const provider = z
  .nativeEnum(EmailProvider)
  .optional()
  .default(EmailProvider.RESEND)
  /* eslint-disable-next-line turbo/no-undeclared-env-vars */
  .parse(process.env.EMAIL_PROVIDER);

export const theme = z
  .nativeEnum(ThemeColor)
  .optional()
  .default(ThemeColor.ORANGE)
  /* eslint-disable-next-line turbo/no-undeclared-env-vars */
  .parse(process.env.EMAIL_THEME);

const configEnv = createEnv({
  ...shared,
  server: {
    EMAIL_FROM: z.string().email(),
    EMAIL_THEME: z.nativeEnum(ThemeColor).optional().default(theme),
    PRODUCT_NAME: z.string().optional(),
  },
});

const getEmailEnv = () => {
  switch (provider) {
    case EmailProvider.RESEND:
      return createEnv({
        ...shared,
        extends: [configEnv],
        server: {
          RESEND_API_KEY: z.string(),
          EMAIL_PROVIDER: z
            .literal(EmailProvider.RESEND)
            .optional()
            .default(EmailProvider.RESEND),
        },
      });
    case EmailProvider.PLUNK:
      return createEnv({
        ...shared,
        extends: [configEnv],
        server: {
          PLUNK_API_KEY: z.string(),
          EMAIL_PROVIDER: z
            .literal(EmailProvider.PLUNK)
            .optional()
            .default(EmailProvider.PLUNK),
        },
      });
    case EmailProvider.POSTMARK:
      return createEnv({
        ...shared,
        extends: [configEnv],
        server: {
          POSTMARK_API_KEY: z.string(),
          EMAIL_PROVIDER: z
            .literal(EmailProvider.POSTMARK)
            .optional()
            .default(EmailProvider.POSTMARK),
        },
      });
    case EmailProvider.NODEMAILER:
      return createEnv({
        ...shared,
        extends: [configEnv],
        server: {
          NODEMAILER_HOST: z.string(),
          NODEMAILER_PORT: z.coerce.number(),
          NODEMAILER_USER: z.string(),
          NODEMAILER_PASSWORD: z.string(),
          EMAIL_PROVIDER: z
            .literal(EmailProvider.NODEMAILER)
            .optional()
            .default(EmailProvider.NODEMAILER),
        },
      });
    case EmailProvider.SENDGRID:
      return createEnv({
        ...shared,
        extends: [configEnv],
        server: {
          SENDGRID_API_KEY: z.string(),
          EMAIL_PROVIDER: z
            .literal(EmailProvider.SENDGRID)
            .optional()
            .default(EmailProvider.SENDGRID),
        },
      });
    default:
      throw new Error(`Unsupported email provider!`);
  }
};

export const env = getEmailEnv();
