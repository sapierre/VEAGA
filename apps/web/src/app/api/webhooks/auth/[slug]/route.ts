import { webhookHandler } from "@turbostarter/auth/api";

import { pathsConfig } from "~/config/paths";
import { auth } from "~/lib/auth/server";

interface AuthWebhookParams {
  params: {
    slug: string;
  };
}

const handler = (request: Request, { params }: AuthWebhookParams) =>
  webhookHandler({
    request,
    client: auth(),
    type: params.slug,
    errorPath: pathsConfig.auth.error,
  });

export { handler as GET, handler as POST };
