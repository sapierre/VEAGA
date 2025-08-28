import { cn } from "@turbostarter/ui";

import type { ComponentProps } from "react";

export const Section = (props: ComponentProps<"section">) => {
  return (
    <section
      {...props}
      className={cn(
        "mx-auto flex flex-col items-center gap-10 px-6 py-10 sm:container sm:gap-12 sm:py-12 md:gap-16 md:py-16 lg:gap-20 lg:py-20",
        props.className,
      )}
    />
  );
};

export const SectionHeader = (props: ComponentProps<"div">) => {
  return (
    <header
      {...props}
      className={cn(
        "mx-auto flex max-w-5xl flex-col items-center gap-3 text-center",
        props.className,
      )}
    />
  );
};

export const SectionBadge = (props: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "group inline-flex h-8 items-center rounded-full border px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors duration-200 hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:text-sm",
        props.className,
      )}
    />
  );
};

export const SectionTitle = ({
  as,
  ...props
}: ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  const As = as ?? "h2";

  return (
    <As
      {...props}
      className={cn(
        "mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[0.95] tracking-tighter md:text-5xl lg:text-6xl",
        props.className,
      )}
    />
  );
};

export const SectionDescription = (props: ComponentProps<"p">) => {
  return (
    <p
      {...props}
      className={cn(
        "max-w-6xl text-balance text-muted-foreground lg:text-lg",
        props.className,
      )}
    />
  );
};
