import { useTranslation } from "@turbostarter/i18n";
import { isExternal } from "@turbostarter/shared/utils";
import { cn } from "@turbostarter/ui";
import { Icons } from "@turbostarter/ui-web/icons";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@turbostarter/ui-web/navigation-menu";

import { TurboLink } from "~/components/common/turbo-link";

import type { NavigationLinkItem, NavigationProps } from "./types";

export const Navigation = ({ links }: NavigationProps) => {
  const { t } = useTranslation();
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {links.map((link) => (
          <NavigationMenuItem key={link.label}>
            {"href" in link ? (
              <NavigationMenuLink asChild>
                <TurboLink
                  href={link.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {t(link.label)}
                </TurboLink>
              </NavigationMenuLink>
            ) : (
              <>
                <NavigationMenuTrigger>{t(link.label)}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-80">
                    {link.items.map((item) => (
                      <li key={item.title}>
                        <Item {...item} />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const Item = ({
  title,
  href,
  description,
  icon: Icon,
  ...props
}: React.ComponentProps<typeof TurboLink> & NavigationLinkItem) => {
  const { t } = useTranslation();
  return (
    <NavigationMenuLink asChild>
      <TurboLink
        {...props}
        href={href}
        {...(isExternal(href) && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        className={cn("group", props.className)}
      >
        <div className="flex items-center gap-3 p-1 py-0.5 lg:py-1">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background transition-colors">
            <Icon className="size-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
          </div>
          <div className="w-full min-w-0">
            <span className="relative w-fit text-sm font-medium leading-none">
              {t(title)}
              {isExternal(href) && (
                <Icons.ArrowUpRight className="-mt-1 ml-0.5 inline size-2.5" />
              )}
            </span>
            <p className="truncate text-sm leading-snug text-muted-foreground">
              {t(description)}
            </p>
          </div>
        </div>
      </TurboLink>
    </NavigationMenuLink>
  );
};
