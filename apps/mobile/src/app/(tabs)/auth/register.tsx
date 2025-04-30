import { View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";

import { Auth } from "~/components/auth/auth";
import { authConfig } from "~/config/auth";

const RegisterPage = () => {
  const { t } = useTranslation("auth");
  return (
    <Auth.Layout>
      <Auth.Header
        title={t("register.header.title")}
        description={t("register.header.description")}
      />
      <Auth.Providers providers={authConfig.providers.oAuth} />
      {authConfig.providers.oAuth.length > 0 && <Auth.Divider />}

      <View className="gap-2">
        <Auth.Register />
        {authConfig.providers.anonymous && <Auth.Anonymous />}
      </View>
      <Auth.LoginCta />
    </Auth.Layout>
  );
};

export default RegisterPage;
