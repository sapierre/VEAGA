import type { emailConfigSchema } from "../config/schema";
import type { z } from "zod";

export const EmailProvider = {
  RESEND: "resend",
  PLUNK: "plunk",
  POSTMARK: "postmark",
  NODEMAILER: "nodemailer",
  SENDGRID: "sendgrid",
} as const;

export type EmailProvider = (typeof EmailProvider)[keyof typeof EmailProvider];

export type EmailConfig = z.infer<typeof emailConfigSchema>;

export * from "./templates";
