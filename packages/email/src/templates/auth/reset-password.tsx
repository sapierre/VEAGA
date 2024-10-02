import { Heading, Preview, Text } from "@react-email/components";
import * as React from "react";

import { Button } from "../_components/button";
import { Layout } from "../_components/layout/layout";

import type { EmailVariables, EmailTemplate } from "../../types";

type Props = EmailVariables[typeof EmailTemplate.CONFIRM_EMAIL];

export const ResetPassword = ({ siteUrl, tokenHash, redirectTo }: Props) => {
  const url = `${siteUrl}/api/webhooks/auth/confirm/?token_hash=${tokenHash}&type=recovery&next=${redirectTo}`;

  return (
    <Layout siteUrl={siteUrl}>
      <Preview>Reset your password for TurboStarter</Preview>
      <Heading>Reset your password</Heading>

      <Text>
        Forgot password? Click the button below to reset your password.
      </Text>

      <Button href={url}>Reset password</Button>

      <Text>Or, copy and paste this link into your browser:</Text>

      <code className="inline-block rounded-md border border-solid border-border bg-muted px-5 py-3.5 font-mono text-xs">
        {url}
      </code>

      <Text className="text-muted-foreground">
        If you didn't request a password reset, there's nothing to worry about,
        you can safely ignore this email.
      </Text>
    </Layout>
  );
};

ResetPassword.subject = "Reset your password";

ResetPassword.PreviewProps = {
  siteUrl: "http://localhost:3000",
  tokenHash: "1234567890",
  redirectTo: "http://localhost:3000/auth/password/update",
};

export default ResetPassword;
