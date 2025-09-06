import { useLocalSearchParams } from "expo-router";

import { useTranslation } from "@turbostarter/i18n";

import {
  AuthLayout,
  AuthHeader,
  UpdatePasswordForm,
} from "~/components/auth/auth";

const UpdatePassword = () => {
  const { token } = useLocalSearchParams<{ token?: string }>();
  const { t } = useTranslation("auth");

  return (
    <AuthLayout>
      <AuthHeader
        title={t("account.password.update.header.title")}
        description={t("account.password.update.header.description")}
      />
      <UpdatePasswordForm token={token} />
    </AuthLayout>
  );
};

export default UpdatePassword;
