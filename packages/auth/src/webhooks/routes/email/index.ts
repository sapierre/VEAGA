import { Webhook } from "standardwebhooks";

import { EmailTemplate } from "@turbostarter/email";
import { sendEmail } from "@turbostarter/email/api";
import { handleApiError } from "@turbostarter/shared/utils";

import { env } from "../../../env";
import { sendEmailHookSchema } from "../../../validators";

import type { SendEmailHookData } from "../../../validators";
import type { WebhookRoute } from "../types";

const emailTypeToTemplate: Record<
  SendEmailHookData["email_data"]["email_action_type"],
  EmailTemplate
> = {
  signup: EmailTemplate.CONFIRM_EMAIL,
  magiclink: EmailTemplate.MAGIC_LINK,
  recovery: EmailTemplate.RESET_PASSWORD,
};

export const emailRoute: WebhookRoute = async ({ request }) => {
  const text = await request.text();

  const wh = new Webhook(env.SEND_EMAIL_HOOK_SECRET.replace("v1,whsec_", ""));
  const data = wh.verify(text, Object.fromEntries(request.headers));

  const { origin } = new URL(request.url);

  try {
    const { user, email_data } = sendEmailHookSchema.parse(data);

    void sendEmail({
      to: user.email,
      template: emailTypeToTemplate[email_data.email_action_type],
      variables: {
        siteUrl: origin,
        tokenHash: email_data.token_hash,
        redirectTo: email_data.redirect_to,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
