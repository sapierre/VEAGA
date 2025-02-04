import { useTranslation } from "@turbostarter/i18n";

import { Auth } from "~/components/auth/auth";

const UpdatePassword = () => {
  const { t } = useTranslation("auth");
  return (
    <Auth.Layout>
      <Auth.Header
        title={t("account.password.update.header.title")}
        description={t("account.password.update.header.description")}
      />
      <Auth.UpdatePassword />
    </Auth.Layout>
  );
};

export default UpdatePassword;
