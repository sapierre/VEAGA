import { getTranslation } from "@turbostarter/i18n/server";

import { Auth } from "~/components/auth/auth";
import { LOGIN_OPTIONS } from "~/components/auth/form/login/constants";
import { authConfig } from "~/config/auth";
import { getMetadata } from "~/lib/metadata";

import type { LoginOption } from "~/components/auth/form/login/constants";

export const generateMetadata = getMetadata({
  title: "auth:login.title",
});

const Login = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) => {
  const { t } = await getTranslation({ ns: "auth" });
  const options = Object.entries(authConfig.providers)
    .filter(
      ([provider, enabled]) =>
        enabled && LOGIN_OPTIONS.includes(provider as LoginOption),
    )
    .map(([provider]) => provider as LoginOption);

  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title={t("login.header.title")}
          description={t("login.header.description")}
        />

        <div className="flex flex-col gap-2">
          <Auth.Providers
            providers={authConfig.providers.oAuth}
            redirectTo={(await searchParams).redirectTo}
          />
          {authConfig.providers.passkey && (
            <Auth.Passkey redirectTo={(await searchParams).redirectTo} />
          )}
        </div>

        {(authConfig.providers.oAuth.length > 0 ||
          authConfig.providers.passkey) &&
          options.length > 0 && <Auth.Divider />}

        <div className="flex flex-col gap-2">
          <Auth.Login
            options={options}
            redirectTo={(await searchParams).redirectTo}
          />

          {authConfig.providers.anonymous && <Auth.Anonymous />}
        </div>

        <Auth.RegisterCta />
      </Auth.Layout>
    </>
  );
};

export default Login;
