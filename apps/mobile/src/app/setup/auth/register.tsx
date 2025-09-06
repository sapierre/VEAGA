import { View } from "react-native";

import { useTranslation } from "@turbostarter/i18n";

import {
  AuthLayout,
  AuthHeader,
  AuthDivider,
  SocialProviders,
  RegisterForm,
  AnonymousLogin,
  LoginCta,
} from "~/components/auth/auth";
import { authConfig } from "~/config/auth";

const RegisterPage = () => {
  const { t } = useTranslation("auth");
  return (
    <AuthLayout>
      <AuthHeader
        title={t("register.header.title")}
        description={t("register.header.description")}
      />
      <SocialProviders providers={authConfig.providers.oAuth} />
      {authConfig.providers.oAuth.length > 0 && <AuthDivider />}

      <View className="gap-2">
        <RegisterForm />
        {authConfig.providers.anonymous && <AnonymousLogin />}
      </View>
      <LoginCta />
    </AuthLayout>
  );
};

export default RegisterPage;
