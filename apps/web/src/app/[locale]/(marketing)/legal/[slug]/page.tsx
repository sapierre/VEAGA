import { notFound } from "next/navigation";

import {
  CollectionType,
  getContentItemBySlug,
  getContentItems,
} from "@turbostarter/cms";
import { getTranslation } from "@turbostarter/i18n/server";

import {
  Section,
  SectionBadge,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "~/components/common/layout/section";
import { Mdx } from "~/components/common/mdx";
import { getMetadata } from "~/lib/metadata";

interface PageParams {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function Page({ params }: PageParams) {
  const item = getContentItemBySlug({
    collection: CollectionType.LEGAL,
    slug: (await params).slug,
    locale: (await params).locale,
  });

  if (!item) {
    notFound();
  }

  const { t } = await getTranslation({ ns: "common" });

  return (
    <Section>
      <SectionHeader>
        <SectionBadge>{t("legal.label")}</SectionBadge>
        <SectionTitle as="h1">{item.title}</SectionTitle>
        <SectionDescription>{item.description}</SectionDescription>
      </SectionHeader>
      <Mdx mdx={item.mdx} />
    </Section>
  );
}

export function generateStaticParams() {
  return getContentItems({ collection: CollectionType.LEGAL }).items.map(
    ({ slug, locale }) => ({
      slug,
      locale,
    }),
  );
}

export async function generateMetadata({ params }: PageParams) {
  const item = getContentItemBySlug({
    collection: CollectionType.LEGAL,
    slug: (await params).slug,
    locale: (await params).locale,
  });

  if (!item) {
    return notFound();
  }

  return getMetadata({
    title: item.title,
    description: item.description,
  })({ params });
}
