import { memo } from "react";

import { useTranslation } from "@turbostarter/i18n";
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

import { appConfig } from "~/config/app";

import { Logout } from "./logout";

import type { User } from "@turbostarter/auth";

const AnonymousUser = () => {
  const { t } = useTranslation("auth");
  return (
    <a
      href={`${appConfig.url}/auth/login`}
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
      <div className="sr-only">{t("login.cta")}</div>
    </a>
  );
};

interface UserNavigationProps {
  readonly user: User | null;
}

export const UserNavigation = memo<UserNavigationProps>(({ user }) => {
  const { t } = useTranslation("common");
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
          <DropdownMenuLabel className="flex items-center gap-2 font-normal">
            <Avatar className="size-8">
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback>
                <Icons.UserRound className="w-5" />
              </AvatarFallback>
            </Avatar>

            <div className="flex w-full min-w-0 flex-col space-y-1">
              {user.name && (
                <p className="text-sm font-medium leading-none">{user.name}</p>
              )}
              {user.email && (
                <p className="truncate text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <a
                href={`${appConfig.url}/dashboard`}
                target="_blank"
                className="flex w-full cursor-pointer items-center gap-1.5"
              >
                <Icons.Home className="size-4" />
                {t("dashboard")}
              </a>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <a
                href={`${appConfig.url}/dashboard/settings`}
                target="_blank"
                className="flex w-full cursor-pointer items-center gap-1.5"
              >
                <Icons.Settings className="size-4" />
                {t("settings")}
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
});

export const UserNavigationSkeleton = () => {
  return <Skeleton className="size-10 rounded-full" />;
};

UserNavigation.displayName = "UserNavigation";
