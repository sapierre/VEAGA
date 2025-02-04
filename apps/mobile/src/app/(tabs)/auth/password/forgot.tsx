import { useTranslation } from "@turbostarter/i18n";

import { Auth } from "~/components/auth/auth";

const ForgotPassword = () => {
  const { t } = useTranslation("auth");
  return (
    <Auth.Layout>
      <Auth.Header
        title={t("account.password.forgot.header.title")}
        description={t("account.password.forgot.header.description")}
      />
      <Auth.ForgotPassword />
    </Auth.Layout>
  );
};

export default ForgotPassword;
