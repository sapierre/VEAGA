import { Heading, Preview, Text } from "@react-email/components";
import * as React from "react";

import { Button } from "../_components/button";
import { Layout } from "../_components/layout/layout";

import type { EmailVariables, EmailTemplate } from "../../types";

type Props = EmailVariables[typeof EmailTemplate.CONFIRM_EMAIL];

export const MagicLink = ({ url }: Props) => {
  const { origin } = new URL(url);

  return (
    <Layout origin={origin}>
      <Preview>Login to TurboStarter with a magic link</Preview>
      <Heading>Your magic link 🪄</Heading>

      <Text>Almost in! Click the button below to login.</Text>

      <Button href={url}>Login with magic link</Button>

      <Text>Or, copy and paste this link into your browser:</Text>

      <code className="inline-block rounded-md border border-solid border-border bg-muted px-5 py-3.5 font-mono text-xs">
        {url}
      </code>

      <Text className="text-muted-foreground">
        If you didn't try to login, there's nothing to worry about, you can
        safely ignore this email.
      </Text>
    </Layout>
  );
};

MagicLink.subject = "Your magic link 🪄";

MagicLink.PreviewProps = {
  url: "http://localhost:3000/api/auth/magic-link/verify?token=123&callbackURL=/dashboard",
};

export default MagicLink;
