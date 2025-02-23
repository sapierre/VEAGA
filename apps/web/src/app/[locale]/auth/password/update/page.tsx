import { getTranslation } from "@turbostarter/i18n/server";

import { Auth } from "~/components/auth/auth";
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
      <Auth.Layout>
        <Auth.Header
          title={t("account.password.update.header.title")}
          description={t("account.password.update.header.description")}
        />
        <Auth.UpdatePassword token={token} />
      </Auth.Layout>
    </>
  );
};

export default UpdatePassword;
