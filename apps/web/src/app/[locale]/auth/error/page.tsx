import { getTranslation } from "@turbostarter/i18n/server";
import { Icons } from "@turbostarter/ui-web/icons";

import { TurboLink } from "~/components/common/turbo-link";
import { pathsConfig } from "~/config/paths";

const AuthError = async ({
  searchParams,
}: {
  searchParams: { error?: string };
}) => {
  const { t } = await getTranslation({ ns: ["common", "auth"] });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Icons.CircleX className="size-24 text-destructive" strokeWidth={1.2} />
      <h1 className="text-center text-2xl font-semibold">
        {t("error.general")}
      </h1>

      {searchParams.error && (
        <code className="rounded-md bg-muted px-2 py-0.5 font-mono">
          {searchParams.error}
        </code>
      )}

      <TurboLink
        href={pathsConfig.auth.login}
        className="mt-3 text-sm text-muted-foreground underline hover:no-underline"
      >
        {t("goToLogin")}
      </TurboLink>
    </div>
  );
};

export default AuthError;
