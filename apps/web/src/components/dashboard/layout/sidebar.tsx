import { memo } from "react";

import { isKey } from "@turbostarter/i18n";
import { getTranslation } from "@turbostarter/i18n/server";
import { Icons } from "@turbostarter/ui-web/icons";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarRail,
} from "@turbostarter/ui-web/sidebar";
import { SidebarMenu } from "@turbostarter/ui-web/sidebar";
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@turbostarter/ui-web/sidebar";
import { Sidebar } from "@turbostarter/ui-web/sidebar";

import { pathsConfig } from "~/config/paths";

import { SidebarLink } from "./sidebar-link";
import { TeamSwitcher } from "./team-switcher";
import { UserNavigation } from "./user-navigation";

import type { User } from "@turbostarter/auth";
import type { Customer } from "@turbostarter/billing";
import type { Icon } from "@turbostarter/ui-web/icons";

interface DashboardSidebarProps {
  readonly user: User;
  readonly customer: Customer | null;
  readonly menu: {
    label: string;
    items: {
      title: string;
      href: string;
      icon: Icon;
    }[];
  }[];
}

export const DashboardSidebar = memo<DashboardSidebarProps>(
  async ({ user, customer, menu }) => {
    const { t, i18n } = await getTranslation({ ns: "common" });

    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <TeamSwitcher user={user} customer={customer} />
        </SidebarHeader>
        <SidebarContent>
          {menu.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel className="uppercase">
                {isKey(group.label, i18n, "common")
                  ? t(group.label)
                  : group.label}
              </SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map((item) => {
                  const title = isKey(item.title, i18n, "common")
                    ? t(item.title)
                    : item.title;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarLink href={item.href} tooltip={title}>
                        <item.icon />
                        <span>{title}</span>
                      </SidebarLink>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}

          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarLink
                    href={pathsConfig.marketing.contact}
                    tooltip={t("support")}
                  >
                    <Icons.LifeBuoy />
                    <span>{t("support")}</span>
                  </SidebarLink>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarLink
                    href={pathsConfig.marketing.contact}
                    tooltip={t("feedback")}
                  >
                    <Icons.MessageCircle />
                    <span>{t("feedback")}</span>
                  </SidebarLink>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <UserNavigation user={user} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  },
);
