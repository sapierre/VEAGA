import { memo } from "react";

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
  ({ user, customer, menu }) => {
    return (
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <TurboLink
                href={pathsConfig.index}
                className="flex w-fit shrink-0 items-center gap-3.5 px-2 pt-2"
              >
                <Icons.Logo className="h-8 text-primary" />
                <Icons.LogoText className="h-3.5 text-foreground" />
              </TurboLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {menu.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel className="uppercase">
                {group.label}
              </SidebarGroupLabel>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <TurboLink href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
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
                      <span>Support</span>
                    </TurboLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild size="sm">
                    <TurboLink href={pathsConfig.marketing.contact}>
                      <Icons.MessageCircle />
                      <span>Feedback</span>
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
