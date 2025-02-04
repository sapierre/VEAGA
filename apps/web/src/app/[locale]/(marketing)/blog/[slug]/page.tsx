import { notFound } from "next/navigation";

import { getContentItemBySlug, getContentItems } from "@turbostarter/cms";
import { CollectionType } from "@turbostarter/cms";

import { Mdx } from "~/components/common/mdx";
import { BLOG_PREFIX } from "~/config/paths";
import { getMetadata } from "~/lib/metadata";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const item = getContentItemBySlug({
    collection: CollectionType.BLOG,
    slug: (await params).slug,
    locale: (await params).locale,
  });

  if (!item) {
    return notFound();
  }

  return <Mdx data={item} base={BLOG_PREFIX} />;
}

export function generateStaticParams() {
  return getContentItems({ collection: CollectionType.BLOG }).items.map(
    (post) => ({
      slug: post.slug,
    }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const item = getContentItemBySlug({
    collection: CollectionType.BLOG,
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
