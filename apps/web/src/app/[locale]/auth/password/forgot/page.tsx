import { getTranslation } from "@turbostarter/i18n/server";

import { Auth } from "~/components/auth/auth";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "auth:account.password.forgot.title",
});

const ForgotPassword = async () => {
  const { t } = await getTranslation({ ns: "auth" });
  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title={t("account.password.forgot.header.title")}
          description={t("account.password.forgot.header.description")}
        />
        <Auth.ForgotPassword />
      </Auth.Layout>
    </>
  );
};

export default ForgotPassword;
