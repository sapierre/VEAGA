"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { toast } from "sonner";

import { PricingPlanType } from "@turbostarter/billing";
import { useTranslation } from "@turbostarter/i18n";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@turbostarter/ui-web/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuGroup,
} from "@turbostarter/ui-web/dropdown-menu";
import { Icons } from "@turbostarter/ui-web/icons";
import { SidebarMenuButton, useSidebar } from "@turbostarter/ui-web/sidebar";
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { signOut } from "~/lib/auth/client";

import type { User } from "@turbostarter/auth";
import type { Customer } from "@turbostarter/billing";

interface UserNavigationProps {
  readonly user: User;
  readonly customer: Customer | null;
}

const PLAN_EMOJIS: Record<PricingPlanType, string> = {
  [PricingPlanType.FREE]: "🆓",
  [PricingPlanType.PREMIUM]: "🔐",
  [PricingPlanType.ENTERPRISE]: "💰",
};

const CustomerStatus = ({ customer }: { customer: Customer | null }) => {
  const plan = !customer?.plan ? PricingPlanType.FREE : customer.plan;

  return (
    <div className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed bg-muted/25 py-1.5">
      <span>{PLAN_EMOJIS[plan]}</span>
      <span>{plan}</span>
    </div>
  );
};

export const UserNavigation = memo<UserNavigationProps>(
  ({ user, customer }) => {
    const { t } = useTranslation(["common", "auth"]);
    const router = useRouter();
    const { isMobile } = useSidebar();

    return (
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
              {user.name && (
                <span className="truncate font-semibold">{user.name}</span>
              )}
              {user.email && (
                <span className="truncate text-xs">{user.email}</span>
              )}
            </div>
            <Icons.EllipsisVertical className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                {user.name && (
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                )}
                {user.email && (
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                )}
                <CustomerStatus customer={customer} />
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <TurboLink
                  href={pathsConfig.dashboard.settings.index}
                  className="flex w-full cursor-pointer items-center gap-1.5"
                >
                  <Icons.Settings className="size-4" />
                  {t("settings")}
                </TurboLink>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <TurboLink
                  href={pathsConfig.dashboard.settings.billing}
                  className="flex w-full cursor-pointer items-center gap-1.5"
                >
                  <Icons.CreditCard className="size-4" />
                  {t("billing")}
                </TurboLink>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className="cursor-pointer">
              <button
                className="flex w-full items-center gap-1.5"
                onClick={async () => {
                  const loadingToast = toast.loading(t("logout.loading"));
                  await signOut(
                    {},
                    {
                      onSuccess: () => {
                        router.replace("/");
                        router.refresh();
                        toast.success(t("logout.success"), {
                          id: loadingToast,
                        });
                      },
                      onError: () => {
                        toast.error(t("logout.error"), {
                          id: loadingToast,
                        });
                      },
                    },
                  );
                }}
              >
                <Icons.LogOut className="size-4" />
                {t("logout.cta")}
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    );
  },
);

export const UserNavigationSkeleton = () => {
  return <Skeleton className="size-10 rounded-full" />;
};

UserNavigation.displayName = "UserNavigation";
