import { APP_LINK, APP_NAME } from "@turbostarter/shared";
import { Icons } from "@turbostarter/ui";

import { buttonVariants } from "~/components/ui/button";

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
      <div className="ml-1 flex items-center justify-center gap-0.5">
        <Icons.Logo className="w-6 shrink-0 text-primary" />
        <span className="font-bold">{APP_NAME}</span>
      </div>
    </a>
  );
};
