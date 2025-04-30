import { View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";

import { Auth } from "~/components/auth/auth";
import { LOGIN_OPTIONS } from "~/components/auth/form/login/constants";
import { VerifyMagicLink } from "~/components/auth/form/login/magic-link";
import { authConfig } from "~/config/auth";

import type { LoginOption } from "~/components/auth/form/login/constants";

const LoginPage = () => {
  const { t } = useTranslation("auth");
  const options = Object.entries(authConfig.providers)
    .filter(
      ([provider, enabled]) =>
        enabled && LOGIN_OPTIONS.includes(provider as LoginOption),
    )
    .map(([provider]) => provider as LoginOption);

  return (
    <Auth.Layout>
      <Auth.Header
        title={t("login.header.title")}
        description={t("login.header.description")}
      />
      <Auth.Providers providers={authConfig.providers.oAuth} />
      {authConfig.providers.oAuth.length > 0 && options.length > 0 && (
        <Auth.Divider />
      )}
      <VerifyMagicLink />

      <View className="gap-2">
        <Auth.Login options={options} />
        {authConfig.providers.anonymous && <Auth.Anonymous />}
      </View>

      <Auth.RegisterCta />
    </Auth.Layout>
  );
};

export default LoginPage;
