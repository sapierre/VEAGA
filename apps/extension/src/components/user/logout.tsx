import { forwardRef } from "react";

import { Icons } from "@turbostarter/ui-web/icons";

import { signOut } from "~/lib/auth";

export const Logout = forwardRef<HTMLButtonElement>((_, ref) => {
  return (
    <button
      className="flex w-full items-center gap-1.5 text-left font-sans"
      onClick={() => signOut()}
      ref={ref}
    >
      <Icons.LogOut className="size-4" />
      Log out
    </button>
  );
});
