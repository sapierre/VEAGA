import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "../utils";

import { users } from "./auth";

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
  userId: text()
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .primaryKey(),
  customerId: text().notNull().unique(),
  status: billingStatusEnum(),
  plan: pricingPlanTypeEnum(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const insertCustomerSchema = createInsertSchema(customers);
export const selectCustomerSchema = createSelectSchema(customers);

export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;
