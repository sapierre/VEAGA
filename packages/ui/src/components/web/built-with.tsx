import { APP_LINK } from "@turbostarter/shared";

import { Logo } from "~/components/shared";
import { buttonVariants } from "~/components/web/button";

export const BuiltWith = () => {
  return (
    <a
      className={buttonVariants({
        variant: "outline",
        className: "cursor-pointer",
      })}
      href={APP_LINK}
      target="_blank"
    >
      Built with{" "}
      <Logo
        withText
        asLink={false}
        className="ml-1.5"
        logoClassName="h-[1.35rem] shrink-0"
      />
    </a>
  );
};
