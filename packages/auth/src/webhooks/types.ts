import type { AuthClient } from "../types";

export const WebhookType = {
  CONFIRM: "confirm",
  CALLBACK: "callback",
  EMAIL: "email",
} as const;

export type WebhookType = (typeof WebhookType)[keyof typeof WebhookType];

export interface WebhookParams {
  request: Request;
  client: AuthClient;
  type: string;
  errorPath: string;
}
