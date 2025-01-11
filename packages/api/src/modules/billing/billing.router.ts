import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import {
  checkoutSchema,
  checkout,
  getBillingPortalSchema,
  getBillingPortal,
  webhookHandler,
  getCustomerByUserId,
} from "@turbostarter/billing/server";

import { enforceAuth } from "../../middleware";

export const billingRouter = new Hono()
  .post(
    "/checkout",
    zValidator("json", checkoutSchema),
    enforceAuth,
    async (c) =>
      c.json(
        await checkout({
          user: c.var.user,
          ...c.req.valid("json"),
        }),
      ),
  )
  .get(
    "/portal",
    zValidator("query", getBillingPortalSchema),
    enforceAuth,
    async (c) =>
      c.json(
        await getBillingPortal({
          user: c.var.user,
          ...c.req.valid("query"),
        }),
      ),
  )
  .get("/customer", enforceAuth, async (c) =>
    c.json(await getCustomerByUserId(c.var.user.id)),
  )
  .post("/webhook", (c) => webhookHandler(c.req.raw));
