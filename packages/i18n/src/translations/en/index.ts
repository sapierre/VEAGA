export const en = {
  common: () => import("./common.json"),
  auth: () => import("./auth.json"),
  billing: () => import("./billing.json"),
  marketing: () => import("./marketing.json"),
  validation: () => import("./validation.json"),
} as const;
