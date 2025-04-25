import { handle } from "hono/vercel";

import { appRouter } from "@turbostarter/api";

const handler = handle(appRouter);
export {
  handler as GET,
  handler as POST,
  handler as OPTIONS,
  handler as PATCH,
  handler as DELETE,
  handler as HEAD,
};