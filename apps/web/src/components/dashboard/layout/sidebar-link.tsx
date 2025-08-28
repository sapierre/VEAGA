"use client";

import { usePathname } from "next/navigation";
import { memo } from "react";

import { SidebarMenuButton, useSidebar } from "@turbostarter/ui-web/sidebar";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

interface SidebarLinkProps
  extends React.ComponentProps<typeof SidebarMenuButton> {
  href: string;
}

export const SidebarLink = memo<SidebarLinkProps>(
  ({ href, children, ...props }) => {
    const { setOpenMobile } = useSidebar();
    const pathname = usePathname();

    return (
      <SidebarMenuButton
        asChild
        isActive={
          href === pathsConfig.dashboard.index
            ? pathname === href
            : pathname.startsWith(href)
        }
        {...props}
      >
        <TurboLink href={href} onClick={() => setOpenMobile(false)}>
          {children}
        </TurboLink>
      </SidebarMenuButton>
    );
  },
);
