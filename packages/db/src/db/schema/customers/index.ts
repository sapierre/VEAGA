import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "../users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

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
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  customerId: text("customer_id").notNull(),
  status: billingStatusEnum("status"),
  plan: pricingPlanTypeEnum("plan"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const insertCustomerSchema = createInsertSchema(customers);
export const selectCustomerSchema = createSelectSchema(customers);

export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;
