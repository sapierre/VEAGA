"use client";

import { memo } from "react";

import { BillingModel } from "@turbostarter/billing";
import { useTranslation } from "@turbostarter/i18n";
import { Tabs, TabsList, TabsTrigger } from "@turbostarter/ui-web/tabs";

import {
  SectionBadge,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "~/components/common/layout/section";

import { Discount } from "./discount";

import type {
  Discount as DiscountType,
  PricingPlanPrice,
  RecurringInterval,
} from "@turbostarter/billing";

interface PricingHeaderProps {
  readonly currency: string;
  readonly model: BillingModel;
  readonly intervals: RecurringInterval[];
  readonly activeInterval: RecurringInterval;
  readonly onIntervalChange: (billing: RecurringInterval) => void;
  readonly priceWithDiscount?: PricingPlanPrice & {
    discount: DiscountType | undefined;
  };
}

export const PricingHeader = memo<PricingHeaderProps>(
  ({
    model,
    activeInterval,
    intervals,
    onIntervalChange,
    priceWithDiscount,
    currency,
  }) => {
    const { t } = useTranslation("billing");

    return (
      <SectionHeader>
        <SectionBadge>{t("pricing.label")}</SectionBadge>
        <SectionTitle>{t("pricing.title")}</SectionTitle>
        <SectionDescription className="max-w-2xl text-center text-muted-foreground">
          {t("pricing.description")}
        </SectionDescription>

        <Discount
          {...(priceWithDiscount && {
            priceWithDiscount,
          })}
          currency={currency}
        />

        {model === BillingModel.RECURRING && intervals.length > 0 && (
          <Tabs
            className="mt-2 lg:mt-4"
            value={activeInterval}
            onValueChange={(value) =>
              onIntervalChange(value as RecurringInterval)
            }
          >
            <TabsList>
              {intervals.map((interval) => (
                <TabsTrigger
                  key={interval}
                  value={interval}
                  className="capitalize"
                >
                  {t(`interval.${interval}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </SectionHeader>
    );
  },
);

PricingHeader.displayName = "PricingHeader";
