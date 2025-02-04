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
      {
        title: "billing",
        href: pathsConfig.dashboard.settings.billing,
        icon: Icons.CreditCard,
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
      <DashboardSidebar user={user} customer={customer} menu={menu} />
      <SidebarInset className="mx-auto max-w-[80rem]">
        <DashboardHeader
          menu={menu.map((group) => ({
            label: group.label,
            items: group.items.map((item) => ({
              title: item.title,
              href: item.href,
            })),
          }))}
        />
        <div className="flex flex-1 p-4 pt-0 md:p-6 md:pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
