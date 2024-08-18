import { memo } from "react";

import { getAvatar, getName } from "@turbostarter/auth";
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


import { Logout } from "./logout";

import type { User } from "@turbostarter/auth";

interface UserNavigationProps {
  readonly user: User;
}

export const UserNavigation = memo<UserNavigationProps>(({ user }) => {
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
              <p className="font-sans text-sm font-medium leading-none">
                {name.join(" ")}
              </p>
            )}
            {user.email && (
              <p className="font-sans text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

UserNavigation.displayName = "UserNavigation";
