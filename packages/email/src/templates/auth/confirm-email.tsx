import { Heading, Preview, Text } from "@react-email/components";
import * as React from "react";

import { Button } from "../_components/button";
import { Layout } from "../_components/layout/layout";

import type { EmailTemplate, EmailVariables } from "../../types";

type Props = EmailVariables[typeof EmailTemplate.CONFIRM_EMAIL];

export const ConfirmEmail = ({ siteUrl, tokenHash, redirectTo }: Props) => {
  const url = `${siteUrl}/api/webhooks/auth/confirm/?token_hash=${tokenHash}&type=signup&next=${redirectTo}`;

  return (
    <Layout siteUrl={siteUrl}>
      <Preview>Confirm your email address for TurboStarter</Preview>
      <Heading>Confirm your email address</Heading>

      <Text>
        One step left! Click the button below to activate your account.
      </Text>

      <Button href={url}>Confirm email address</Button>

      <Text>Or, copy and paste this link into your browser:</Text>

      <code className="inline-block rounded-md border border-solid border-border bg-muted px-5 py-3.5 font-mono text-xs">
        {url}
      </code>

      <Text className="text-muted-foreground">
        If you didn't sign up for an account, there's nothing to worry about,
        you can safely ignore this email.
      </Text>
    </Layout>
  );
};

ConfirmEmail.subject = "Confirm your email";

ConfirmEmail.PreviewProps = {
  siteUrl: "http://localhost:3000",
  tokenHash: "1234567890",
  redirectTo: "http://localhost:3000/auth/login",
};

export default ConfirmEmail;
