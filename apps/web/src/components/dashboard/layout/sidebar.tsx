import { memo } from "react";

import { isKey } from "@turbostarter/i18n";
import { getTranslation } from "@turbostarter/i18n/server";
import { Icons } from "@turbostarter/ui-web/icons";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
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

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

import { UserNavigation } from "./user-navigation";

import type { User } from "@turbostarter/auth";
import type { Customer } from "@turbostarter/billing";

interface DashboardSidebarProps {
  readonly user: User;
  readonly customer: Customer | null;
  readonly menu: {
    label: string;
    items: {
      title: string;
      href: string;
      icon: (typeof Icons)[keyof typeof Icons];
    }[];
  }[];
}

export const DashboardSidebar = memo<DashboardSidebarProps>(
  async ({ user, customer, menu }) => {
    const { t, i18n } = await getTranslation({ ns: "common" });

    return (
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <TurboLink
                href={pathsConfig.index}
                className="flex w-fit shrink-0 items-center gap-3 px-2 pt-2"
              >
                <Icons.Logo className="h-7 text-primary" />
                <Icons.LogoText className="h-3.5 text-foreground" />
              </TurboLink>
            </SidebarMenuItem>
          </SidebarMenu>
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
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <TurboLink href={item.href}>
                        <item.icon />
                        <span>
                          {isKey(item.title, i18n, "common")
                            ? t(item.title)
                            : item.title}
                        </span>
                      </TurboLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}

          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild size="sm">
                    <TurboLink href={pathsConfig.marketing.contact}>
                      <Icons.LifeBuoy />
                      <span>{t("support")}</span>
                    </TurboLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild size="sm">
                    <TurboLink href={pathsConfig.marketing.contact}>
                      <Icons.MessageCircle />
                      <span>{t("feedback")}</span>
                    </TurboLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <UserNavigation user={user} customer={customer} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  },
);
