import { notFound } from "next/navigation";

import {
  CollectionType,
  getContentItemBySlug,
  getContentItems,
} from "@turbostarter/cms";

import { Mdx } from "~/components/common/mdx";
import { LEGAL_PREFIX } from "~/config/paths";
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

  return <Mdx data={item} base={LEGAL_PREFIX} />;
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
