import { useTranslation } from "@turbostarter/i18n";

import {
  AuthLayout,
  AuthHeader,
  ForgotPasswordForm,
} from "~/components/auth/auth";

const ForgotPassword = () => {
  const { t } = useTranslation("auth");
  return (
    <AuthLayout>
      <AuthHeader
        title={t("account.password.forgot.header.title")}
        description={t("account.password.forgot.header.description")}
      />
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
