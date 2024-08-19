import { eq } from "@turbostarter/db";

import { db } from "@turbostarter/db/client";
import { InsertCustomer, customers } from "@turbostarter/db/schema";

export const getCustomerByUserId = async (userId: string) => {
  const [data] = await db
    .select()
    .from(customers)
    .where(eq(customers.userId, userId));

  return data;
};

export const getCustomerByCustomerId = async (customerId: string) => {
  const [data] = await db
    .select()
    .from(customers)
    .where(eq(customers.customerId, customerId));

  return data;
};

export const updateCustomer = (
  userId: string,
  data: Partial<InsertCustomer>,
) => {
  return db.update(customers).set(data).where(eq(customers.userId, userId));
};

export const upsertCustomer = (data: InsertCustomer) => {
  return db.insert(customers).values(data).onConflictDoUpdate({
    target: customers.userId,
    set: data,
  });
};
