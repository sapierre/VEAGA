import { z } from "zod";

import { GENERIC_ERROR_MESSAGE, HttpStatusCode } from "../constants";

const apiErrorSchema = z.object({
  message: z.string(),
  status: z.number(),
  timestamp: z.string(),
});

export const isApiError = (e: unknown): e is ApiError => {
  return apiErrorSchema.safeParse(e).success;
};

const isHttpStatus = (status: number): status is HttpStatusCode =>
  Object.values<number>(HttpStatusCode).includes(status);

export class ApiError extends Error {
  status: HttpStatusCode;
  constructor(status: number, message: string) {
    super(message);
    this.status = isHttpStatus(status)
      ? status
      : HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}

const getStatusCode = (e: unknown) => {
  if (typeof e === "object" && e && "status" in e) {
    return Number(e.status);
  }

  return HttpStatusCode.INTERNAL_SERVER_ERROR;
};

export const onApiError = (
  e: unknown,
  request?: Request,
): globalThis.Response => {
  console.error(e);

  const details = {
    status: getStatusCode(e),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const timestamp = new Date().toISOString();
  const path = request?.url ? new URL(request.url).pathname : "/api";

  if (e instanceof Error) {
    return new globalThis.Response(
      JSON.stringify({
        message: e.message,
        status: details.status,
        timestamp,
        path,
      }),
      details,
    );
  }

  return new globalThis.Response(
    JSON.stringify({
      message: GENERIC_ERROR_MESSAGE,
      status: details.status,
      timestamp,
      path,
    }),
    details,
  );
};
