import { HttpStatusCode } from "@turbostarter/shared/constants";
import { HttpException } from "@turbostarter/shared/utils";

import { env } from "../../env";
import { updateCustomer, upsertCustomer } from "../../lib/customer";
import { getCustomerByUserId } from "../../server";
import { BillingProvider } from "../../types";

import { polar } from "./client";

const getPolarCustomerById = async (customerId: string) => {
  return polar().customers.get({ id: customerId });
};

const getPolarCustomerByEmail = async (email: string) => {
  const customers = await polar().customers.list({
    email,
  });

  return customers.result.items[0];
};

const createPolarCustomer = async (email: string) => {
  if (env.BILLING_PROVIDER !== BillingProvider.POLAR) {
    throw new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
      code: "billing:error.invalidProvider",
    });
  }

  const newCustomer = await polar().customers.create({
    email,
  });

  return newCustomer;
};

export const createOrRetrieveCustomer = async ({
  email,
  id,
}: {
  email: string;
  id: string;
}) => {
  const existingCustomer = await getCustomerByUserId(id);

  const polarCustomer = existingCustomer?.customerId
    ? await getPolarCustomerById(existingCustomer.customerId)
    : await getPolarCustomerByEmail(email);

  const polarCustomerToProcess =
    polarCustomer ?? (await createPolarCustomer(email));

  if (existingCustomer && polarCustomer) {
    if (existingCustomer.customerId !== polarCustomer.id) {
      await updateCustomer(id, {
        customerId: polarCustomerToProcess.id,
      });
      console.warn(
        `Customer ${id} had a different customerId. Updated to ${polarCustomerToProcess.id}.`,
      );
    }

    return polarCustomerToProcess;
  }

  await upsertCustomer({
    userId: id,
    customerId: polarCustomerToProcess.id,
  });

  return polarCustomerToProcess;
};
