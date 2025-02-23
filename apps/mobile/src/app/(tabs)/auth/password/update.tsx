import { useLocalSearchParams } from "expo-router";

import { useTranslation } from "@turbostarter/i18n";

import { Auth } from "~/components/auth/auth";

const UpdatePassword = () => {
  const { token } = useLocalSearchParams<{ token?: string }>();
  const { t } = useTranslation("auth");

  return (
    <Auth.Layout>
      <Auth.Header
        title={t("account.password.update.header.title")}
        description={t("account.password.update.header.description")}
      />
      <Auth.UpdatePassword token={token} />
    </Auth.Layout>
  );
};

export default UpdatePassword;
