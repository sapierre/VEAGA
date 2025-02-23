import { useTranslation } from "@turbostarter/i18n";
import { Icons } from "@turbostarter/ui-web/icons";

import { signOut } from "~/lib/auth";

export const Logout = () => {
  const { t } = useTranslation("auth");

  return (
    <button
      className="flex w-full items-center gap-1.5 text-left font-sans"
      onClick={() => signOut()}
    >
      <Icons.LogOut className="size-4" />
      {t("logout.cta")}
    </button>
  );
};
