import * as React from "react";

import { Logo } from "../shared";

import { buttonVariants } from "./button";

export const BuiltWith = () => {
  return (
    <a
      className={buttonVariants({
        variant: "outline",
        className: "cursor-pointer font-sans",
      })}
      href="https://www.turbostarter.dev"
      target="_blank"
    >
      Built with{" "}
      <Logo withText className="ml-1.5" logoClassName="h-[1.35rem] shrink-0" />
    </a>
  );
};
