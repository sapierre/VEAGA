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
        <Auth.Providers
          providers={authConfig.providers.oAuth}
          redirectTo={(await searchParams).redirectTo}
        />
        {authConfig.providers.oAuth.length > 0 && options.length > 0 && (
          <Auth.Divider />
        )}
        <Auth.Login
          options={options}
          redirectTo={(await searchParams).redirectTo}
        />
      </Auth.Layout>
    </>
  );
};

export default Login;
