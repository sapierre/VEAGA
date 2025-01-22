import { Heading, Preview, Text } from "@react-email/components";
import * as React from "react";

import { Button } from "../_components/button";
import { Layout } from "../_components/layout/layout";

import type { EmailTemplate, EmailVariables } from "../../types";

type Props = EmailVariables[typeof EmailTemplate.CONFIRM_EMAIL];

export const ConfirmEmail = ({ url }: Props) => {
  const { origin } = new URL(url);

  return (
    <Layout origin={origin}>
      <Preview>Confirm your email address for TurboStarter</Preview>
      <Heading>Confirm your email address</Heading>

      <Text>
        One step left! Click the button below to verify your email address.
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
  url: "http://localhost:3000/api/auth/verify-email?token=123&callbackURL=/dashboard",
};

export default ConfirmEmail;
