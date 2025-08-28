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

type Props = EmailVariables[typeof EmailTemplate.MAGIC_LINK] & CommonEmailProps;

export const MagicLink = async ({ url, token, locale }: Props) => {
  const { t } = await getTranslation({ locale, ns: "auth" });
  const { origin } = new URL(url);

  return (
    <Layout origin={origin} locale={locale}>
      <Preview>{t("login.magicLink.email.preview")}</Preview>
      <Heading className="tracking-tight">
        {t("login.magicLink.email.subject")}
      </Heading>

      <Text>{t("login.magicLink.email.body")}</Text>

      <Button href={`${url}?token=${token}`}>
        {t("login.magicLink.email.cta")}
      </Button>

      <Text>{t("login.magicLink.email.or")}</Text>

      <code className="inline-block rounded-md border border-solid border-border bg-muted px-5 py-3.5 font-mono text-xs">
        {`${url}?token=${token}`}
      </code>

      <Text className="text-muted-foreground">
        {t("login.magicLink.email.disclaimer")}
      </Text>
    </Layout>
  );
};

MagicLink.subject = async ({ locale }: CommonEmailProps) => {
  const { t } = await getTranslation({ locale, ns: "auth" });
  return t("login.magicLink.email.subject");
};

MagicLink.PreviewProps = {
  url: "http://localhost:3000/api/auth/magic-link/verify?token=123&callbackURL=/dashboard",
  locale: "en",
};

export default MagicLink;
