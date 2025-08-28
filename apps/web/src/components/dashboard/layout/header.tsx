"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import * as z from "zod";

import { isKey, useTranslation } from "@turbostarter/i18n";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@turbostarter/ui-web/breadcrumb";
import { buttonVariants } from "@turbostarter/ui-web/button";
import { Icons } from "@turbostarter/ui-web/icons";
import { Separator } from "@turbostarter/ui-web/separator";
import { SidebarTrigger } from "@turbostarter/ui-web/sidebar";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

const indexSchema = z.object({
  index: z.string(),
});

const isWithIndex = (value: unknown): value is z.infer<typeof indexSchema> => {
  return indexSchema.safeParse(value).success;
};

const getPath = (
  obj: object | null,
  target: string,
  current: { key: string; path?: string }[] = [],
): { key: string; path?: string }[] | null => {
  if (!obj) return null;

  for (const [key, value] of Object.entries(obj)) {
    const newPath =
      typeof value === "string"
        ? [...current, { key, path: value }]
        : isWithIndex(value)
          ? [...current, { key, path: value.index }]
          : [...current, { key }];

    const filtered = newPath.filter((item) => item.key !== "index");

    if (typeof value === "string" && value === target) {
      return filtered;
    }

    if (typeof value === "object") {
      const result = getPath(value as object, target, filtered);
      if (result) return result;
    }
  }

  return null;
};

export const DashboardHeader = () => {
  const { t, i18n } = useTranslation("common");
  const pathname = usePathname();

  const path = getPath(pathsConfig, pathname);
  const last = path?.at(-1);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear md:px-6 lg:px-7">
      <div className="flex items-center gap-2 pr-4">
        <SidebarTrigger className="-ml-1" />
        {path ? (
          <>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {path.length > 1 &&
                  path.slice(1, -1).map((item, index, array) => (
                    <Fragment key={item.key}>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <TurboLink href={item.path ?? "#"}>
                            {isKey(item.key, i18n, "common")
                              ? t(item.key)
                              : item.key}
                          </TurboLink>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < array.length - 1 && <BreadcrumbSeparator />}
                    </Fragment>
                  ))}

                {last && (
                  <>
                    {path.length > 2 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {isKey(last.key, i18n, "common")
                          ? t(last.key)
                          : last.key}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </>
        ) : null}
      </div>

      <div className="flex items-center text-muted-foreground">
        <a
          href="https://github.com/turbostarter"
          rel="noopener noreferrer"
          target="_blank"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Icons.Github className="size-5" />
        </a>

        <a
          href="https://discord.gg/KjpK2uk3JP"
          rel="noopener noreferrer"
          target="_blank"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Icons.Discord className="size-5" />
        </a>
      </div>
    </header>
  );
};
