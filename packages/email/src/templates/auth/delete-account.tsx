import { Heading, Preview, Text } from "@react-email/components";
import * as React from "react";

import { getTranslation } from "@turbostarter/i18n/server";

import { Button } from "../_components/button";
import { Layout } from "../_components/layout/layout";

import type {
  EmailTemplate,
  EmailVariables,
  CommonEmailProps,
} from "../../types";

type Props = EmailVariables[typeof EmailTemplate.DELETE_ACCOUNT] &
  CommonEmailProps;

export const DeleteAccount = async ({ url, locale }: Props) => {
  const { t } = await getTranslation({ locale, ns: "auth" });
  const { origin } = new URL(url);

  return (
    <Layout origin={origin} locale={locale}>
      <Preview>{t("account.delete.email.preview")}</Preview>
      <Heading className="tracking-tight">
        {t("account.delete.email.subject")}
      </Heading>

      <Text>{t("account.delete.email.body")}</Text>

      <Button href={url}>{t("account.delete.email.cta")}</Button>

      <Text>{t("account.delete.email.or")}</Text>

      <code className="inline-block rounded-md border border-solid border-border bg-muted px-5 py-3.5 font-mono text-xs">
        {url}
      </code>

      <Text className="text-muted-foreground">
        {t("account.delete.email.disclaimer")}
      </Text>
    </Layout>
  );
};

DeleteAccount.subject = async ({ locale }: CommonEmailProps) => {
  const { t } = await getTranslation({ locale, ns: "auth" });
  return t("account.delete.email.subject");
};

DeleteAccount.PreviewProps = {
  url: "http://localhost:3000/api/auth/delete-user/callback?token=123&callbackURL=/",
  locale: "en",
};

export default DeleteAccount;
