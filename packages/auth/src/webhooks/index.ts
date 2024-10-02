import { routes } from "./routes";
import { WebhookType } from "./types";

import type { WebhookParams } from "./types";

const isRelevantType = (type: string): type is WebhookType => {
  return Object.values<string>(WebhookType).includes(type);
};

export const webhookHandler = ({
  request,
  client,
  type,
  errorPath,
}: WebhookParams) => {
  if (!isRelevantType(type)) {
    return new Response("Webhook type not supported!", { status: 404 });
  }

  return routes[type]({ request, client, errorPath });
};
