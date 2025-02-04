import { getTranslation } from "@turbostarter/i18n/server";

import { Auth } from "~/components/auth/auth";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "auth:account.password.update.title",
});

const UpdatePassword = async () => {
  const { t } = await getTranslation({ ns: "auth" });
  return (
    <>
      <Auth.Layout>
        <Auth.Header
          title={t("account.password.update.header.title")}
          description={t("account.password.update.header.description")}
        />
        <Auth.UpdatePassword />
      </Auth.Layout>
    </>
  );
};

export default UpdatePassword;
