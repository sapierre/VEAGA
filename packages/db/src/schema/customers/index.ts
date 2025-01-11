import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { users } from "../auth";

export const billingStatusEnum = pgEnum("status", [
  "ACTIVE",
  "CANCELED",
  "INCOMPLETE",
  "INCOMPLETE_EXPIRED",
  "PAST_DUE",
  "PAUSED",
  "TRIALING",
  "UNPAID",
]);

export const pricingPlanTypeEnum = pgEnum("plan", [
  "FREE",
  "PREMIUM",
  "ENTERPRISE",
]);

export const customers = pgTable("customers", {
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .primaryKey(),
  customerId: text("customer_id").notNull(),
  status: billingStatusEnum("status"),
  plan: pricingPlanTypeEnum("plan"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .$onUpdate(() => new Date().toISOString()),
});

export const insertCustomerSchema = createInsertSchema(customers);
export const selectCustomerSchema = createSelectSchema(customers);

export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;
