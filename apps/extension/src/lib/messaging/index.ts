import { defineExtensionMessaging } from "@webext-core/messaging";

import type { Session } from "@turbostarter/auth";

export const Message = {
  SESSION_GET: "session:get",
  SESSION_DELETE: "session:delete",
} as const;

export type Message = (typeof Message)[keyof typeof Message];

interface Messages {
  [Message.SESSION_GET]: () => Session | null;
  [Message.SESSION_DELETE]: () => void;
}

// eslint-disable-next-line @typescript-eslint/unbound-method
export const { onMessage, sendMessage } = defineExtensionMessaging<Messages>();
