import { isAuthApiError } from "@supabase/supabase-js";

import { HTTP_STATUS_CODE } from "@turbostarter/shared/constants";

import type { WebhookRoute } from "../types";

export const callbackRoute: WebhookRoute = async ({
  request,
  client,
  errorPath,
}) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("next") ?? origin;

  if (code) {
    try {
      const { error } = await client.exchangeCodeForSession(code);

      if (error) {
        return new Response(null, {
          status: HTTP_STATUS_CODE.FOUND,
          headers: {
            Location: `${origin}${errorPath}?code=${error.code}`,
          },
        });
      }
    } catch (error) {
      if (isAuthApiError(error)) {
        return new Response(null, {
          status: HTTP_STATUS_CODE.FOUND,
          headers: {
            Location: `${origin}${errorPath}?code=${error.code}`,
          },
        });
      }

      return new Response(null, {
        status: HTTP_STATUS_CODE.FOUND,
        headers: {
          Location: `${origin}${errorPath}`,
        },
      });
    }
  }

  return new Response(null, {
    status: HTTP_STATUS_CODE.FOUND,
    headers: {
      Location: redirectTo,
    },
  });
};
