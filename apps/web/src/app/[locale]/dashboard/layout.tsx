import { redirect } from "next/navigation";

import { handle } from "@turbostarter/api/utils";
import { Icons } from "@turbostarter/ui-web/icons";
import { SidebarInset, SidebarProvider } from "@turbostarter/ui-web/sidebar";

import { DashboardHeader } from "~/components/dashboard/layout/header";
import { DashboardSidebar } from "~/components/dashboard/layout/sidebar";
import { pathsConfig } from "~/config/paths";
import { api } from "~/lib/api/server";
import { getSession } from "~/lib/auth/server";
import { getCurrentUser } from "~/lib/auth/roles";

// Dynamic menu based on user role
const getMenu = (userRole?: string) => {
  const baseMenu = [
    {
      label: "platform",
      items: [
        {
          title: "home",
          href: pathsConfig.dashboard.index,
          icon: Icons.Home,
        },
        {
          title: "flows",
          href: "/dashboard/flows",
          icon: Icons.Workflow,
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

  // Add super admin section if user is super admin
  if (userRole === "super_admin") {
    baseMenu.unshift({
      label: "super admin",
      items: [
        {
          title: "admin dashboard",
          href: "/dashboard/admin",
          icon: Icons.Shield,
        },
      ],
    });
  }

  return baseMenu;
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getSession();

  if (!user) {
    return redirect(pathsConfig.auth.login);
  }

  // Get user with role information
  const currentUser = await getCurrentUser();
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
        menu={getMenu(currentUser?.role)}
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
