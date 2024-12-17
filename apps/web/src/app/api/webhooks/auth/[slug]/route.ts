import { webhookHandler } from "@turbostarter/auth/server";

import { pathsConfig } from "~/config/paths";
import { auth } from "~/lib/auth/server";

interface AuthWebhookParams {
  params: Promise<{
    slug: string;
  }>;
}

const handler = async (request: Request, { params }: AuthWebhookParams) =>
  webhookHandler({
    request,
    client: await auth(),
    type: (await params).slug,
    errorPath: pathsConfig.auth.error,
  });

export { handler as GET, handler as POST };
