import { PricingPlanType, FEATURES } from "@turbostarter/billing";

interface PlanFeature {
  readonly id: string;
  readonly available: boolean;
  readonly title: string;
  readonly addon?: React.ReactNode;
}

export const PLAN_FEATURES: Record<PricingPlanType, PlanFeature[]> = {
  [PricingPlanType.FREE]: [
    {
      id: FEATURES.FREE.SYNC,
      available: true,
      title: "billing:plan.starter.features.sync",
    },
    {
      id: FEATURES.FREE.BASIC_SUPPORT,
      available: true,
      title: "billing:plan.starter.features.basicSupport",
    },
    {
      id: FEATURES.FREE.LIMITED_STORAGE,
      available: true,
      title: "billing:plan.starter.features.limitedStorage",
    },
    {
      id: FEATURES.FREE.EMAIL_NOTIFICATIONS,
      available: true,
      title: "billing:plan.starter.features.emailNotifications",
    },
    {
      id: FEATURES.FREE.BASIC_REPORTS,
      available: true,
      title: "billing:plan.starter.features.basicReports",
    },
    {
      id: FEATURES.PREMIUM.ADVANCED_SYNC,
      available: false,
      title: "billing:plan.premium.features.advancedSync",
    },
    {
      id: FEATURES.PREMIUM.PRIORITY_SUPPORT,
      available: false,
      title: "billing:plan.premium.features.prioritySupport",
    },
    {
      id: FEATURES.PREMIUM.MORE_STORAGE,
      available: false,
      title: "billing:plan.premium.features.moreStorage",
    },
  ],
  [PricingPlanType.PREMIUM]: [
    {
      id: FEATURES.PREMIUM.ADVANCED_SYNC,
      available: true,
      title: "billing:plan.premium.features.advancedSync",
    },
    {
      id: FEATURES.PREMIUM.PRIORITY_SUPPORT,
      available: true,
      title: "billing:plan.premium.features.prioritySupport",
    },
    {
      id: FEATURES.PREMIUM.MORE_STORAGE,
      available: true,
      title: "billing:plan.premium.features.moreStorage",
    },
    {
      id: FEATURES.PREMIUM.TEAM_COLLABORATION,
      available: true,
      title: "billing:plan.premium.features.teamCollaboration",
    },
    {
      id: FEATURES.PREMIUM.SMS_NOTIFICATIONS,
      available: true,
      title: "billing:plan.premium.features.smsNotifications",
    },
    {
      id: FEATURES.PREMIUM.ADVANCED_REPORTS,
      available: true,
      title: "billing:plan.premium.features.advancedReports",
    },
    {
      id: FEATURES.ENTERPRISE.UNLIMITED_STORAGE,
      available: false,
      title: "billing:plan.enterprise.features.unlimitedStorage",
    },
    {
      id: FEATURES.ENTERPRISE.CUSTOM_BRANDING,
      available: false,
      title: "billing:plan.enterprise.features.customBranding",
    },
    {
      id: FEATURES.ENTERPRISE.DEDICATED_SUPPORT,
      available: false,
      title: "billing:plan.enterprise.features.dedicatedSupport",
    },
  ],
  [PricingPlanType.ENTERPRISE]: [
    {
      id: FEATURES.ENTERPRISE.UNLIMITED_STORAGE,
      available: true,
      title: "billing:plan.enterprise.features.unlimitedStorage",
    },
    {
      id: FEATURES.ENTERPRISE.CUSTOM_BRANDING,
      available: true,
      title: "billing:plan.enterprise.features.customBranding",
    },
    {
      id: FEATURES.ENTERPRISE.DEDICATED_SUPPORT,
      available: true,
      title: "billing:plan.enterprise.features.dedicatedSupport",
    },
    {
      id: FEATURES.ENTERPRISE.API_ACCESS,
      available: true,
      title: "billing:plan.enterprise.features.apiAccess",
    },
    {
      id: FEATURES.ENTERPRISE.USER_ROLES,
      available: true,
      title: "billing:plan.enterprise.features.userRoles",
    },
    {
      id: FEATURES.ENTERPRISE.AUDIT_LOGS,
      available: true,
      title: "billing:plan.enterprise.features.auditLogs",
    },
    {
      id: FEATURES.ENTERPRISE.SINGLE_SIGN_ON,
      available: true,
      title: "billing:plan.enterprise.features.singleSignOn",
    },
    {
      id: FEATURES.ENTERPRISE.ADVANCED_ANALYTICS,
      available: true,
      title: "billing:plan.enterprise.features.advancedAnalytics",
    },
  ],
};
