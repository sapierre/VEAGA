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

type Props = EmailVariables[typeof EmailTemplate.CHANGE_EMAIL] &
  CommonEmailProps;

export const ChangeEmail = async ({ url, locale }: Props) => {
  const { t } = await getTranslation({ locale, ns: "auth" });
  const { origin } = new URL(url);

  return (
    <Layout origin={origin} locale={locale}>
      <Preview>{t("account.email.change.email.preview")}</Preview>
      <Heading className="tracking-tight">
        {t("account.email.change.email.subject")}
      </Heading>

      <Text>{t("account.email.change.email.body")}</Text>

      <Button href={url}>{t("account.email.change.email.cta")}</Button>

      <Text>{t("account.email.change.email.or")}</Text>

      <code className="inline-block rounded-md border border-solid border-border bg-muted px-5 py-3.5 font-mono text-xs">
        {url}
      </code>

      <Text className="text-muted-foreground">
        {t("account.email.change.email.disclaimer")}
      </Text>
    </Layout>
  );
};

ChangeEmail.subject = async ({ locale }: CommonEmailProps) => {
  const { t } = await getTranslation({ locale, ns: "auth" });
  return t("account.email.change.email.subject");
};

ChangeEmail.PreviewProps = {
  url: "http://localhost:3000/api/auth/verify-email?token=123&callbackURL=/dashboard/settings",
  locale: "en",
};

export default ChangeEmail;
