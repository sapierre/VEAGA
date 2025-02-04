import { forwardRef } from "react";

import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-web/icons";

import { signOut } from "~/lib/auth";

export const Logout = forwardRef<HTMLButtonElement>((_, ref) => {
  const { t } = useTranslation("auth");

  return (
    <button
      className="flex w-full items-center gap-1.5 text-left font-sans"
      onClick={() => signOut()}
      ref={ref}
    >
      <Icons.LogOut className="size-4" />
      {t("logout.cta")}
    </button>
  );
});
