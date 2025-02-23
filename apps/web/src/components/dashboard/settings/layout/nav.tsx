"use client";

import { usePathname } from "next/navigation";
import { memo } from "react";

import { cn } from "@turbostarter/ui";
import { useBreakpoint } from "@turbostarter/ui-web";
import { Button } from "@turbostarter/ui-web/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@turbostarter/ui-web/drawer";
import { Icons } from "@turbostarter/ui-web/icons";

import { TurboLink } from "~/components/common/turbo-link";

interface SettingsNavProps {
  readonly links: {
    label: string;
    href: string;
  }[];
}

export const SettingsNav = memo(({ links }: SettingsNavProps) => {
  const isDesktop = useBreakpoint("lg");
  const pathname = usePathname();

  if (isDesktop) {
    return (
      <ul className="-ml-3 flex flex-col pr-10">
        {links.map((link) => (
          <li key={link.href}>
            <TurboLink
              href={link.href}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted",
                {
                  "font-medium text-foreground": pathname === link.href,
                },
              )}
            >
              {link.label}
            </TurboLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Icons.Menu className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <ul className="flex flex-col p-6">
          {links.map((link) => (
            <li key={link.href}>
              <DrawerClose asChild>
                <TurboLink
                  href={link.href}
                  className={cn(
                    "block rounded-md py-2.5 text-muted-foreground",
                    {
                      "font-medium text-foreground": pathname === link.href,
                    },
                  )}
                >
                  {link.label}
                </TurboLink>
              </DrawerClose>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
});

SettingsNav.displayName = "SettingsNav";
