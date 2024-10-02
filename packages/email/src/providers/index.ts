import { EmailProvider } from "../types";

import { nodemailerStrategy } from "./nodemailer";
import { plunkStrategy } from "./plunk";
import { postmarkStrategy } from "./postmark";
import { resendStrategy } from "./resend";
import { sendgridStrategy } from "./sendgrid";

import type { EmailProviderStrategy } from "./types";

export const strategies: Record<EmailProvider, EmailProviderStrategy> = {
  [EmailProvider.RESEND]: resendStrategy,
  [EmailProvider.PLUNK]: plunkStrategy,
  [EmailProvider.POSTMARK]: postmarkStrategy,
  [EmailProvider.NODEMAILER]: nodemailerStrategy,
  [EmailProvider.SENDGRID]: sendgridStrategy,
};
