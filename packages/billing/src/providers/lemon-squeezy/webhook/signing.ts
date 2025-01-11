import crypto from "node:crypto";

import { HttpStatusCode } from "@turbostarter/shared/constants";
import { ApiError } from "@turbostarter/shared/utils";

export const validateSignature = (
  sig: string,
  secret: string,
  body: string,
) => {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
  const signature = Buffer.from(sig || "", "utf8");

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new ApiError(
      HttpStatusCode.BAD_REQUEST,
      "Invalid webhook signature.",
    );
  }
};
