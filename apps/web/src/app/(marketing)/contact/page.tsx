import { ContactForm } from "~/components/marketing/contact/contact-form";
import { getMetadata } from "~/lib/metadata";

export const metadata = getMetadata({
  title: "Contact",
  description: "Contact us for any questions or feedback",
});

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col items-center gap-6 self-start sm:gap-8 md:gap-10 lg:gap-12">
      <header className="flex flex-col items-center justify-center gap-3">
        <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Contact
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground">
          Contact us for any questions or feedback
        </p>
      </header>

      <ContactForm />
    </div>
  );
}
