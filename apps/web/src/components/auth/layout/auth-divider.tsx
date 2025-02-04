import { getTranslation } from "@turbostarter/i18n/server";

export const AuthDivider = async () => {
  const { t } = await getTranslation({ ns: "auth" });

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-input" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-background px-2 text-muted-foreground">
          {t("divider")}
        </span>
      </div>
    </div>
  );
};
