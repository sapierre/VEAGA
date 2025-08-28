import { getTranslation } from "@turbostarter/i18n/server";
import { withI18n } from "@turbostarter/i18n/with-i18n";

import {
  Section,
  SectionBadge,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "~/components/common/layout/section";
import { ContactForm } from "~/components/marketing/contact/contact-form";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "marketing:contact.label",
  description: "marketing:contact.description",
});

const ContactPage = async () => {
  const { t } = await getTranslation({ ns: "marketing" });
  return (
    <Section>
      <SectionHeader>
        <SectionBadge>{t("contact.label")}</SectionBadge>
        <SectionTitle>{t("contact.title")}</SectionTitle>
        <SectionDescription>{t("contact.description")}</SectionDescription>
      </SectionHeader>

      <ContactForm />
    </Section>
  );
};

export default withI18n(ContactPage);
