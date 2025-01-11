import { Heading, Preview, Row, Column } from "@react-email/components";
import * as React from "react";

import { Layout } from "./_components/layout/layout";

import type { EmailTemplate } from "../types";
import type { EmailVariables } from "../types";

type Props = EmailVariables[typeof EmailTemplate.CONTACT_FORM];

export const ContactForm = (props: Props) => {
  return (
    <Layout>
      <Preview>You've received a new contact form submission</Preview>
      <Heading>New contact form submission</Heading>

      {Object.entries(props).map(([key, value]) => (
        <Row key={key}>
          <Column>
            <strong>{key}</strong>: {value}
          </Column>
        </Row>
      ))}
    </Layout>
  );
};

ContactForm.subject = "You've received a new contact form submission";

ContactForm.PreviewProps = {
  name: "John Doe",
  email: "john.doe@example.com",
  message: "Hello, I'm interested in your services.",
};

export default ContactForm;
