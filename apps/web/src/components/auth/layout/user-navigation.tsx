"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { toast } from "sonner";

import { Icons } from "@turbostarter/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@turbostarter/ui/web";

import { logout } from "~/lib/actions";
import { getAvatar, getName, onPromise } from "~/utils";

import type { User } from "@turbostarter/auth";

interface UserNavigationProps {
  readonly user: User;
  readonly onNavigate?: () => void;
}

export const UserNavigation = memo<UserNavigationProps>(
  ({ user, onNavigate }) => {
    const router = useRouter();
    const name = getName(user)?.split(" ");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative flex items-center gap-4 rounded-md">
            <Avatar className="size-10">
              <AvatarImage src={getAvatar(user)} alt={name?.join(" ")} />
              <AvatarFallback>
                <Icons.UserRound className="w-5" />
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              {name && (
                <p className="text-sm font-medium leading-none">
                  {name.join(" ")}
                </p>
              )}
              {user.email && (
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="cursor-pointer">
            <button
              className="w-full"
              onClick={onPromise(() =>
                Promise.resolve(
                  toast.promise(logout(), {
                    loading: "Logging out...",
                    success: () => {
                      onNavigate?.();
                      router.replace("/");
                      router.refresh();
                      return "Logged out!";
                    },
                    error: "Failed to log out!",
                  }),
                ),
              )}
            >
              Log out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

UserNavigation.displayName = "UserNavigation";
