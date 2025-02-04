import i18next from "i18next";
import { ZodIssueCode, ZodParsedType, defaultErrorMap } from "zod";

import { config } from "../config";

import type { TFunction } from "i18next";
import type { ErrorMapCtx, ZodIssueOptionalMessage } from "zod";

const jsonStringifyReplacer = (_: string, value: unknown): unknown => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};

function joinValues<T extends unknown[]>(array: T, separator = " | "): string {
  return array
    .map((val) => (typeof val === "string" ? `'${val}'` : val))
    .join(separator);
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) return false;

  for (const key in value) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) return false;
  }

  return true;
};

const getKeyAndValues = (
  param: unknown,
  defaultKey: string,
): {
  values: Record<string, unknown>;
  key: string;
} => {
  if (typeof param === "string") return { key: param, values: {} };

  if (isRecord(param)) {
    const key =
      "key" in param && typeof param.key === "string" ? param.key : defaultKey;
    const values =
      "values" in param && isRecord(param.values) ? param.values : {};
    return { key, values };
  }

  return { key: defaultKey, values: {} };
};

export interface ZodI18nMapOption {
  t?: TFunction;
  handlePath?: HandlePathOption | false;
}

export interface HandlePathOption {
  context?: string;
  keyPrefix?: string;
}

const defaultNs = "validation";

export const makeZodI18nMap =
  (options?: ZodI18nMapOption) =>
  (issue: ZodIssueOptionalMessage, ctx: ErrorMapCtx) => {
    const { t, ns, handlePath } = {
      t: i18next.t,
      ns: defaultNs,
      ...options,
      handlePath:
        options?.handlePath !== false
          ? {
              context: "with_path",
              ns: config.namespaces,
              keyPrefix: undefined,
              ...options?.handlePath,
            }
          : null,
    } as const;

    const defaultMessage = defaultErrorMap(issue, ctx).message;

    const path =
      issue.path.length > 0 && !!handlePath
        ? {
            context: handlePath.context,
            path: t(
              [handlePath.keyPrefix, issue.path.join(".")]
                .filter(Boolean)
                .join("."),
              {
                ns: handlePath.ns,
                defaultValue: issue.path.join("."),
              },
            ),
          }
        : {};

    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          const code = `${ns}:error.undefined`;

          return {
            message: t(code, {
              ns,
              defaultValue: defaultMessage,
              ...path,
            }),
            code,
          };
        } else {
          const code = `${ns}:error.type`;

          return {
            message: t(code, {
              ns,
              expected: t(`type.${issue.expected}`, {
                defaultValue: issue.expected,
              }),
              received: t(`type.${issue.received}`, {
                defaultValue: issue.received,
              }),
              defaultValue: defaultMessage,
              ...path,
            }),
            code,
          };
        }
      case ZodIssueCode.invalid_literal: {
        const code = `${ns}:error.literal`;

        return {
          message: t(code, {
            expected: JSON.stringify(issue.expected, jsonStringifyReplacer),
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.unrecognized_keys: {
        const code = `${ns}:error.unrecognizedKeys`;

        return {
          message: t(code, {
            keys: joinValues(issue.keys, ", "),
            count: issue.keys.length,
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.invalid_union: {
        const code = `${ns}:error.union`;

        return {
          message: t(code, {
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.invalid_union_discriminator: {
        const code = `${ns}:error.union.discriminator`;

        return {
          message: t(code, {
            options: joinValues(issue.options),
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.invalid_enum_value: {
        const code = `${ns}:error.enum`;

        return {
          message: t(code, {
            options: joinValues(issue.options),
            received: issue.received,
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.invalid_arguments: {
        const code = `${ns}:error.arguments`;

        return {
          message: t(code, {
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.invalid_return_type: {
        const code = `${ns}:error.return`;

        return {
          message: t(code, {
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.invalid_date: {
        const code = `${ns}:error.date`;

        return {
          message: t(code, {
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.invalid_string: {
        if (typeof issue.validation === "object") {
          if ("startsWith" in issue.validation) {
            const code = `${ns}:error.string.startsWith`;

            return {
              message: t(code, {
                startsWith: issue.validation.startsWith,
                ns,
                defaultValue: defaultMessage,
                ...path,
              }),
              code,
            };
          } else if ("endsWith" in issue.validation) {
            const code = `${ns}:error.string.endsWith`;

            return {
              message: t(code, {
                endsWith: issue.validation.endsWith,
                ns,
                defaultValue: defaultMessage,
                ...path,
              }),
              code,
            };
          }
        } else {
          const code = `${ns}:error.string.${issue.validation}`;

          return {
            message: t(code, {
              validation: t(`validation.${issue.validation}`, {
                defaultValue: issue.validation,
                ns,
              }),
              ns,
              defaultValue: defaultMessage,
              ...path,
            }),
            code,
          };
        }

        break;
      }

      case ZodIssueCode.too_small: {
        const minimum =
          issue.type === "date"
            ? new Date(issue.minimum as number)
            : issue.minimum;

        const code = `${ns}:error.tooSmall.${issue.type}.${
          issue.exact ? "exact" : issue.inclusive ? "inclusive" : "notInclusive"
        }`;

        return {
          message: t(code, {
            minimum,
            count: typeof minimum === "number" ? minimum : undefined,
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.too_big: {
        const maximum =
          issue.type === "date"
            ? new Date(issue.maximum as number)
            : issue.maximum;

        const code = `${ns}:error.tooBig.${issue.type}.${
          issue.exact ? "exact" : issue.inclusive ? "inclusive" : "notInclusive"
        }`;

        return {
          message: t(code, {
            maximum,
            count: typeof maximum === "number" ? maximum : undefined,
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.custom: {
        const { key, values } = getKeyAndValues(
          issue.params?.i18n,
          "error.custom",
        );

        return {
          message: t(key, {
            ...values,
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code: key,
        };
      }
      case ZodIssueCode.invalid_intersection_types: {
        const code = `${ns}:error.intersection`;

        return {
          message: t(code, {
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.not_multiple_of: {
        const code = `${ns}:error.notMultipleOf`;

        return {
          message: t(code, {
            multipleOf: issue.multipleOf,
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      case ZodIssueCode.not_finite: {
        const code = `${ns}:error.notFinite`;

        return {
          message: t(code, {
            ns,
            defaultValue: defaultMessage,
            ...path,
          }),
          code,
        };
      }
      default:
        return { message: defaultMessage, code: `${ns}:error.default` };
    }

    return { message: defaultMessage, code: `${ns}:error.default` };
  };
