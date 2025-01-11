import { Heading, Preview, Text } from "@react-email/components";
import * as React from "react";

import { Button } from "../_components/button";
import { Layout } from "../_components/layout/layout";

import type { EmailTemplate, EmailVariables } from "../../types";

type Props = EmailVariables[typeof EmailTemplate.DELETE_ACCOUNT];

export const DeleteAccount = ({ url }: Props) => {
  const { origin } = new URL(url);

  return (
    <Layout origin={origin}>
      <Preview>Delete your account for TurboStarter</Preview>
      <Heading>We're sorry to see you go</Heading>

      <Text>Click the button below to permanently delete your account.</Text>

      <Button href={url}>Delete account</Button>

      <Text>Or, copy and paste this link into your browser:</Text>

      <code className="inline-block rounded-md border border-solid border-border bg-muted px-5 py-3.5 font-mono text-xs">
        {url}
      </code>

      <Text className="text-muted-foreground">
        If you didn't request account deletion, there's nothing to worry about,
        you can safely ignore this email.
      </Text>
    </Layout>
  );
};

DeleteAccount.subject = "We're sorry to see you go";

DeleteAccount.PreviewProps = {
  url: "http://localhost:3000/api/auth/delete-user/callback?token=123&callbackURL=/",
};

export default DeleteAccount;
