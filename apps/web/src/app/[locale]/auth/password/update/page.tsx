import { getTranslation } from "@turbostarter/i18n/server";

import {
  AuthLayout,
  AuthHeader,
  UpdatePasswordForm,
} from "~/components/auth/auth";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "auth:account.password.update.title",
});

interface UpdatePasswordPageProps {
  readonly searchParams: Promise<{
    readonly token?: string;
  }>;
}

const UpdatePassword = async ({ searchParams }: UpdatePasswordPageProps) => {
  const token = (await searchParams).token;
  const { t } = await getTranslation({ ns: "auth" });

  return (
    <>
      <AuthLayout>
        <AuthHeader
          title={t("account.password.update.header.title")}
          description={t("account.password.update.header.description")}
        />
        <UpdatePasswordForm token={token} />
      </AuthLayout>
    </>
  );
};

export default UpdatePassword;
