"use client";

import { memo } from "react";

import { PricingPlanType } from "@turbostarter/billing";
import { useTranslation } from "@turbostarter/i18n";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@turbostarter/ui-web/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@turbostarter/ui-web/dropdown-menu";
import { Icons } from "@turbostarter/ui-web/icons";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@turbostarter/ui-web/sidebar";

import type { User } from "@turbostarter/auth";
import type { Customer } from "@turbostarter/billing";

interface TeamSwitcherProps {
  readonly user: User;
  readonly customer: Customer | null;
}

export const TeamSwitcher = memo<TeamSwitcherProps>(({ user, customer }) => {
  const { t } = useTranslation("auth");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8">
                <AvatarImage src={user.image ?? undefined} alt={user.name} />
                <AvatarFallback>
                  <Icons.UserRound className="w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {t("account.personal")}
                </span>
                <span className="truncate text-xs">
                  {customer?.plan ?? PricingPlanType.FREE}
                </span>
              </div>

              <Icons.ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
});

TeamSwitcher.displayName = "TeamSwitcher";
