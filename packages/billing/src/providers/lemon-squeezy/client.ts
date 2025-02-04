import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

import { HttpStatusCode } from "@turbostarter/shared/constants";
import { HttpException } from "@turbostarter/shared/utils";

import { env } from "../../env";
import { BillingProvider } from "../../types";

export const setup = () => {
  if (env.BILLING_PROVIDER !== BillingProvider.LEMON_SQUEEZY) {
    throw new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
      code: "billing:error.invalidProvider",
    });
  }

  return lemonSqueezySetup({
    apiKey: env.LEMON_SQUEEZY_API_KEY,
    onError: (error) => {
      console.error(error);
      throw new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
        code: "billing:error.lemonSqueezy",
        message: error.message,
      });
    },
  });
};
