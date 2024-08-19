"use client";

import { memo } from "react";

import { Switch, Tabs, TabsList, TabsTrigger } from "@turbostarter/ui/web";

// import { Discount } from "./discount";
import {
  BillingModel,
  PricingPlanPrice,
  RecurringInterval,
} from "@turbostarter/billing";

type PricingHeaderProps = {
  readonly model: BillingModel;
  readonly intervals: RecurringInterval[];
  readonly activeInterval: RecurringInterval;
  readonly onIntervalChange: (billing: RecurringInterval) => void;
  readonly priceWithDiscount?: PricingPlanPrice;
};

export const PricingHeader = memo<PricingHeaderProps>(
  ({
    activeInterval,
    intervals,
    onIntervalChange,
    priceWithDiscount,
    model,
  }) => {
    return (
      <header className="flex flex-col items-center justify-center gap-3">
        <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Pricing
        </h1>
        {model === BillingModel.ONE_TIME && (
          <p className="max-w-2xl text-center text-muted-foreground">
            Pay once. Use forever. <br />
            No recurring fees. No hidden charges.
          </p>
        )}

        {/* <Discount
          {...(priceWithDiscount && {
            priceWithDiscount,
          })}
          className="md:text-lg"
        /> */}

        {model === BillingModel.RECURRING && (
          <>
            <p className="max-w-2xl text-center text-muted-foreground">
              Choose a billing period that fits your needs.
            </p>
            <Tabs
              className="mt-4 lg:mt-6"
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
                    {interval}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </>
        )}
      </header>
    );
  },
);

PricingHeader.displayName = "PricingHeader";
