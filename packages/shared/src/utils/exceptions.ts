import { GENERIC_ERROR_MESSAGE, HttpStatusCode } from "../constants";

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

export const handleError = (e: unknown) => {
  if (e instanceof Error) {
    return { message: e.message, success: false } as const;
  }

  return { message: GENERIC_ERROR_MESSAGE, success: false } as const;
};

const getStatusCode = (e: unknown) => {
  if (typeof e === "object" && e && "status" in e) {
    return Number(e.status);
  }

  return HttpStatusCode.INTERNAL_SERVER_ERROR;
};

export const handleApiError = (e: unknown) => {
  console.error(e);

  const details = {
    status: getStatusCode(e),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const timestamp = new Date().toISOString();

  if (e instanceof Error) {
    return new Response(
      JSON.stringify({
        error: {
          message: e.message,
          status: details.status,
          timestamp,
        },
      }),
      details,
    );
  }

  return new Response(
    JSON.stringify({
      error: {
        message: GENERIC_ERROR_MESSAGE,
        status: details.status,
        timestamp,
      },
    }),
    details,
  );
};
