"use client";

import { useTheme } from "next-themes";
import { memo } from "react";

import { cn } from "@turbostarter/ui";
import { Icons } from "@turbostarter/ui";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@turbostarter/ui/web";

interface ThemeSwitchProps {
  readonly className?: string;
}

export const ThemeSwitch = memo<ThemeSwitchProps>(({ className }) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("rounded-full", className)}
        >
          <Icons.Sun className="h-[1.2rem] w-[1.2rem] scale-100 dark:scale-0" />
          <Icons.Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ThemeSwitch.displayName = "ThemeSwitch";
