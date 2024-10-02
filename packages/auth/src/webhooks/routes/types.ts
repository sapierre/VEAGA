import type { WebhookParams } from "../types";

type WebhookRouteParams = Omit<WebhookParams, "type">;

export type WebhookRoute = (params: WebhookRouteParams) => Promise<Response>;
