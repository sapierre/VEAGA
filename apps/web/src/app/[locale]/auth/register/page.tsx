import { getTranslation } from "@turbostarter/i18n/server";

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
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "auth:register.title",
});

const Register = async () => {
  const { t } = await getTranslation({ ns: "auth" });

  return (
    <>
      <AuthLayout>
        <AuthHeader
          title={t("register.header.title")}
          description={t("register.header.description")}
        />
        <SocialProviders providers={authConfig.providers.oAuth} />
        {authConfig.providers.oAuth.length > 0 && <AuthDivider />}
        <div className="flex flex-col gap-2">
          <RegisterForm />
          {authConfig.providers.anonymous && <AnonymousLogin />}
        </div>
        <LoginCta />
      </AuthLayout>
    </>
  );
};

export default Register;
