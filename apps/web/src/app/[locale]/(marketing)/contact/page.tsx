import { getTranslation } from "@turbostarter/i18n/server";
import { withI18n } from "@turbostarter/i18n/with-i18n";

import { ContactForm } from "~/components/marketing/contact/contact-form";
import { getMetadata } from "~/lib/metadata";

export const generateMetadata = getMetadata({
  title: "marketing:contact.title",
  description: "marketing:contact.description",
});

const ContactPage = async () => {
  const { t } = await getTranslation({ ns: "marketing" });
  return (
    <div className="flex w-full flex-col items-center gap-6 self-start sm:gap-8 md:gap-10 lg:gap-12">
      <header className="flex flex-col items-center justify-center gap-3">
        <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          {t("contact.title")}
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground">
          {t("contact.description")}
        </p>
      </header>

      <ContactForm />
    </div>
  );
};

export default withI18n(ContactPage);
