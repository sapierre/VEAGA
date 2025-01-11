import { GENERIC_ERROR_MESSAGE } from "@turbostarter/shared/constants";
import { isApiError } from "@turbostarter/shared/utils";

import type { ClientRequestOptions } from "hono";
import type { ClientResponse } from "hono/client";

type HandleReturn<T, E extends boolean> = E extends true ? T : T | null;

export const handle = <TResponse, TArgs, E extends boolean = true>(
  fn: (
    args: TArgs,
    options?: ClientRequestOptions,
  ) => Promise<ClientResponse<TResponse, number, "json">>,
  throwOnError: E = true as E,
) => {
  const handler = async (
    args?: TArgs,
    options?: ClientRequestOptions,
  ): Promise<HandleReturn<TResponse, E>> => {
    const response = await fn(args as TArgs, options);

    let data;
    try {
      data = await response.json();
    } catch (e) {
      if (throwOnError) {
        throw new Error(e instanceof Error ? e.message : GENERIC_ERROR_MESSAGE);
      }
      return null as HandleReturn<TResponse, E>;
    }

    if (!response.ok) {
      if (throwOnError) {
        throw new Error(
          isApiError(data) ? data.message : GENERIC_ERROR_MESSAGE,
        );
      }
      return null as HandleReturn<TResponse, E>;
    }

    return data as HandleReturn<TResponse, E>;
  };

  return Object.assign(handler, {
    __responseType: {} as HandleReturn<TResponse, E>,
  });
};
