import { Heading, Preview, Text } from "@react-email/components";
import * as React from "react";

import { getTranslation } from "@turbostarter/i18n/server";

import { Button } from "../_components/button";
import { Layout } from "../_components/layout/layout";

import type {
  EmailVariables,
  EmailTemplate,
  CommonEmailProps,
} from "../../types";

type Props = EmailVariables[typeof EmailTemplate.CONFIRM_EMAIL] &
  CommonEmailProps;

export const ConfirmEmail = async ({ url, locale }: Props) => {
  const { t } = await getTranslation({ locale, ns: "auth" });
  const { origin } = new URL(url);

  return (
    <Layout origin={origin} locale={locale}>
      <Preview>{t("account.email.confirm.email.preview")}</Preview>
      <Heading>{t("account.email.confirm.email.subject")}</Heading>

      <Text>{t("account.email.confirm.email.body")}</Text>

      <Button href={url}>{t("account.email.confirm.email.cta")}</Button>

      <Text>{t("account.email.confirm.email.or")}</Text>

      <code className="inline-block rounded-md border border-solid border-border bg-muted px-5 py-3.5 font-mono text-xs">
        {url}
      </code>

      <Text className="text-muted-foreground">
        {t("account.email.confirm.email.disclaimer")}
      </Text>
    </Layout>
  );
};

ConfirmEmail.subject = async ({ locale }: CommonEmailProps) => {
  const { t } = await getTranslation({ locale, ns: "auth" });
  return t("account.email.confirm.email.subject");
};

ConfirmEmail.PreviewProps = {
  url: "http://localhost:3000/api/auth/verify-email?token=123&callbackURL=/dashboard",
  locale: "en",
};

export default ConfirmEmail;
