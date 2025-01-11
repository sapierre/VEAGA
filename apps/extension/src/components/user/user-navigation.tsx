import { memo } from "react";

import { PricingPlanType } from "@turbostarter/billing";
import { cn } from "@turbostarter/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@turbostarter/ui-web/avatar";
import { buttonVariants } from "@turbostarter/ui-web/button";
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
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { env } from "~/lib/env";

import { Logout } from "./logout";

import type { User } from "@turbostarter/auth";
import type { Customer } from "@turbostarter/billing";

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

const AnonymousUser = () => {
  return (
    <a
      href={`${env.VITE_SITE_URL}/auth/login`}
      className={cn(
        buttonVariants({
          variant: "outline",
          size: "icon",
        }),
        "rounded-full",
      )}
      target="_blank"
    >
      <Icons.LogIn className="size-4" />
      <div className="sr-only">Log in</div>
    </a>
  );
};

interface UserNavigationProps {
  readonly user: User | null;
  readonly customer: Customer | null;
}

export const UserNavigation = memo<UserNavigationProps>(
  ({ user, customer }) => {
    if (!user) {
      return <AnonymousUser />;
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative flex items-center gap-4 rounded-md">
            <Avatar className="size-10">
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback>
                <Icons.UserRound className="w-5" />
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal container={document.querySelector("[data-theme]")}>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                {user.name && (
                  <p className="font-sans text-sm font-medium leading-none">
                    {user.name}
                  </p>
                )}
                {user.email && (
                  <p className="font-sans text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                )}
                <CustomerStatus customer={customer} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a
                  href={`${env.VITE_SITE_URL}/dashboard`}
                  target="_blank"
                  className="flex w-full cursor-pointer items-center gap-1.5"
                >
                  <Icons.Home className="size-4" />
                  Dashboard
                </a>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <a
                  href={`${env.VITE_SITE_URL}/dashboard/settings`}
                  target="_blank"
                  className="flex w-full cursor-pointer items-center gap-1.5"
                >
                  <Icons.Settings className="size-4" />
                  Settings
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <Logout />
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
