import { redirect } from "next/navigation";

import { handle } from "@turbostarter/api/utils";
import { Icons } from "@turbostarter/ui-web/icons";
import { SidebarInset, SidebarProvider } from "@turbostarter/ui-web/sidebar";

import { DashboardHeader } from "~/components/dashboard/layout/header";
import { DashboardSidebar } from "~/components/dashboard/layout/sidebar";
import { pathsConfig } from "~/config/paths";
import { api } from "~/lib/api/server";
import { getSession } from "~/lib/auth/server";

const menu = [
  {
    label: "platform",
    items: [
      {
        title: "home",
        href: pathsConfig.dashboard.index,
        icon: Icons.Home,
      },
      {
        title: "ai",
        href: pathsConfig.dashboard.ai,
        icon: Icons.Brain,
      },
    ],
  },
  {
    label: "account",
    items: [
      {
        title: "settings",
        href: pathsConfig.dashboard.settings.index,
        icon: Icons.Settings,
      },
    ],
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getSession();

  if (!user) {
    return redirect(pathsConfig.auth.login);
  }

  const customer = await handle(api.billing.customer.$get)();

  return (
    <SidebarProvider>
      <DashboardSidebar
        user={user}
        customer={
          customer
            ? {
                ...customer,
                createdAt: new Date(customer.createdAt),
                updatedAt: new Date(customer.updatedAt),
              }
            : null
        }
        menu={menu}
      />
      <SidebarInset className="mx-auto max-w-[80rem]">
        <DashboardHeader />
        <div className="flex flex-1 p-4 pt-0 md:p-6 md:pt-0 lg:p-7 lg:pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
