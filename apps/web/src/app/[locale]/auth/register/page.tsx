import { getTranslation } from "@turbostarter/i18n/server";

import { Auth } from "~/components/auth/auth";
import { authConfig } from "~/config/auth";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "auth:register.title",
});

const Register = async () => {
  const { t } = await getTranslation({ ns: "auth" });

  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title={t("register.header.title")}
          description={t("register.header.description")}
        />
        <Auth.Providers providers={authConfig.providers.oAuth} />
        {authConfig.providers.oAuth.length > 0 && <Auth.Divider />}
        <div className="flex flex-col gap-2">
          <Auth.Register />
          {authConfig.providers.anonymous && <Auth.Anonymous />}
        </div>
        <Auth.LoginCta />
      </Auth.Layout>
    </>
  );
};

export default Register;
