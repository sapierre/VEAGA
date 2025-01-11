import { Heading, Preview, Text } from "@react-email/components";
import * as React from "react";

import { Button } from "../_components/button";
import { Layout } from "../_components/layout/layout";

import type { EmailTemplate, EmailVariables } from "../../types";

type Props = EmailVariables[typeof EmailTemplate.CHANGE_EMAIL];

export const ChangeEmail = ({ url }: Props) => {
  const { origin } = new URL(url);

  return (
    <Layout origin={origin}>
      <Preview>Change your email address for TurboStarter</Preview>
      <Heading>Change your email address</Heading>

      <Text>
        Did you request to change your email address? Click the button below to
        confirm the change.
      </Text>

      <Button href={url}>Confirm change email request</Button>

      <Text>Or, copy and paste this link into your browser:</Text>

      <code className="inline-block rounded-md border border-solid border-border bg-muted px-5 py-3.5 font-mono text-xs">
        {url}
      </code>

      <Text className="text-muted-foreground">
        If you didn't request to change your email address, there's nothing to
        worry about, you can safely ignore this email.
      </Text>
    </Layout>
  );
};

ChangeEmail.subject = "Change email request";

ChangeEmail.PreviewProps = {
  url: "http://localhost:3000/api/auth/verify-email?token=123&callbackURL=/dashboard/settings",
};

export default ChangeEmail;
