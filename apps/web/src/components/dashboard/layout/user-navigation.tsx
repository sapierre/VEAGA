"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { toast } from "sonner";

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

import { ThemeControlsProvider } from "~/components/common/theme";
import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";
import { signOut } from "~/lib/auth/client";

import type { User } from "@turbostarter/auth";

interface UserNavigationProps {
  readonly user: User;
}

export const UserNavigation = memo<UserNavigationProps>(({ user }) => {
  const { t } = useTranslation(["common", "auth"]);
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

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
              <TurboLink
                href={pathsConfig.dashboard.index}
                className="flex w-full cursor-pointer items-center gap-1.5"
                onClick={() => setOpenMobile(false)}
              >
                <Icons.Home className="size-4" />
                {t("dashboard")}
              </TurboLink>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <TurboLink
                href={pathsConfig.dashboard.settings.index}
                className="flex w-full cursor-pointer items-center gap-1.5"
                onClick={() => setOpenMobile(false)}
              >
                <Icons.Settings className="size-4" />
                {t("settings")}
              </TurboLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <ThemeControlsProvider>
              <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                <div className="flex w-full cursor-pointer items-center gap-1.5">
                  <Icons.Sun className="size-4 dark:hidden" />
                  <Icons.Moon className="hidden size-4 dark:block" />
                  {t("theme.title")}

                  <div className="ml-auto size-3 rounded-full bg-primary"></div>
                </div>
              </DropdownMenuItem>
            </ThemeControlsProvider>
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
                      router.replace(pathsConfig.index);
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
});

export const UserNavigationSkeleton = () => {
  return <Skeleton className="size-10 rounded-full" />;
};

UserNavigation.displayName = "UserNavigation";
