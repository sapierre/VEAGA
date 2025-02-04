import { notFound } from "next/navigation";

import { config, isLocaleSupported } from "@turbostarter/i18n";

import { BaseLayout } from "~/components/common/layout/base";
import { Toaster } from "~/components/common/toast";
import { getMetadata } from "~/lib/metadata";
import { Providers } from "~/providers/providers";

export function generateStaticParams() {
  return config.locales.map((locale) => ({ locale }));
}

export const generateMetadata = getMetadata();

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  if (!isLocaleSupported(locale)) {
    return notFound();
  }

  return (
    <BaseLayout locale={locale}>
      <Providers locale={locale}>
        {children}
        <Toaster />
      </Providers>
    </BaseLayout>
  );
}
