import { redirect } from "next/navigation";

import { handle } from "@turbostarter/api/utils";

import { ManagePlan } from "~/components/dashboard/settings/billing/manage-plan";
import { PlanSummary } from "~/components/dashboard/settings/billing/plan-summary";
import { pathsConfig } from "~/config/paths";
import { api } from "~/lib/api/server";
import { getSession } from "~/lib/auth/server";
import { getMetadata } from "~/lib/metadata";

export const metadata = getMetadata({
  title: "Billing",
  description: "Manage your billing and subscription",
});

export default async function BillingPage() {
  const { user } = await getSession();

  if (!user) {
    return redirect(pathsConfig.auth.login);
  }

  const customer = await handle(api.billing.customer.$get)();

  return (
    <div className="flex w-full flex-col gap-6">
      <header className="py-2">
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your billing and subscription.
        </p>
      </header>

      <PlanSummary customer={customer} />
      <ManagePlan customer={customer} />
    </div>
  );
}
