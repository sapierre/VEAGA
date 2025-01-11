"use server";

import { EmailTemplate } from "@turbostarter/email";
import { sendEmail } from "@turbostarter/email/server";
import { GENERIC_ERROR_MESSAGE } from "@turbostarter/shared/constants";

import { env } from "~/lib/env";

import type { ContactFormPayload } from "../utils/schema";

export const sendContactForm = async (data: ContactFormPayload) => {
  try {
    await sendEmail({
      to: env.CONTACT_EMAIL,
      template: EmailTemplate.CONTACT_FORM,
      variables: data,
    });
    return { error: null };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    }
    return { error: GENERIC_ERROR_MESSAGE };
  }
};
