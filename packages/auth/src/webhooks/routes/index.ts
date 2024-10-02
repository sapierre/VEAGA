import { WebhookType } from "../types";

import { callbackRoute } from "./callback";
import { confirmRoute } from "./confirm";
import { emailRoute } from "./email";

import type { WebhookRoute } from "./types";

export const routes: Record<WebhookType, WebhookRoute> = {
  [WebhookType.CONFIRM]: confirmRoute,
  [WebhookType.CALLBACK]: callbackRoute,
  [WebhookType.EMAIL]: emailRoute,
};
