"use client";

import { usePathname } from "next/navigation";
import { memo } from "react";

import { isKey, useTranslation } from "@turbostarter/i18n";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@turbostarter/ui-web/breadcrumb";
import { Separator } from "@turbostarter/ui-web/separator";
import { SidebarTrigger } from "@turbostarter/ui-web/sidebar";

import { I18nControls } from "~/components/common/i18n/controls";
import { ThemeControls } from "~/components/common/theme";

interface DashboardHeaderProps {
  readonly menu: {
    label: string;
    items: {
      title: string;
      href: string;
    }[];
  }[];
}

export const DashboardHeader = memo<DashboardHeaderProps>(({ menu }) => {
  const { t, i18n } = useTranslation("common");
  const pathname = usePathname();

  const title =
    menu
      .find((group) => group.items.find((item) => item.href === pathname))
      ?.items.find((item) => item.href === pathname)?.title ?? "dashboard";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:px-6">
      <div className="flex items-center gap-2 pr-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isKey(title, i18n, "common") ? t(title) : title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-3">
        <I18nControls />
        <ThemeControls />
      </div>
    </header>
  );
});
