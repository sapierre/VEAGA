import { redirect } from "next/navigation";

import { handle } from "@turbostarter/api/utils";

import { ManagePlan } from "~/components/dashboard/settings/billing/manage-plan";
import { PlanSummary } from "~/components/dashboard/settings/billing/plan-summary";
import { pathsConfig } from "~/config/paths";
import { api } from "~/lib/api/server";
import { getSession } from "~/lib/auth/server";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "billing",
  description: "billing:manage.description",
});

export default async function BillingPage() {
  const { user } = await getSession();

  if (!user) {
    return redirect(pathsConfig.auth.login);
  }

  const customer = await handle(api.billing.customer.$get)();

  return (
    <>
      <PlanSummary customer={customer} />
      <ManagePlan customer={customer} />
    </>
  );
}
