import { HTTP_STATUS_CODE } from "@turbostarter/shared/constants";

import type { WebhookRoute } from "../types";
import type { EmailOtpType } from "@supabase/supabase-js";

export const confirmRoute: WebhookRoute = async ({
  request,
  client,
  errorPath,
}) => {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const redirectTo = searchParams.get("next") ?? origin;

  if (!token_hash || !type) {
    return new Response(null, {
      status: HTTP_STATUS_CODE.FOUND,
      headers: {
        Location: redirectTo,
      },
    });
  }

  const { data, error } = await client.verifyOtp({
    type,
    token_hash,
  });

  if (error || !data.session) {
    const redirectBaseUrl = new URL(redirectTo);

    return new Response(null, {
      status: HTTP_STATUS_CODE.FOUND,
      headers: {
        Location: `${redirectBaseUrl.protocol}//${redirectBaseUrl.host}${errorPath}?code=${error?.code}`,
      },
    });
  }

  return new Response(null, {
    status: HTTP_STATUS_CODE.FOUND,
    headers: {
      Location: `${redirectTo}?access_token=${data.session.access_token}&refresh_token=${data.session.refresh_token}`,
    },
  });
};
