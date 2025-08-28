import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getContentItemBySlug, getContentItems } from "@turbostarter/cms";
import { CollectionType } from "@turbostarter/cms";
import { getTranslation } from "@turbostarter/i18n/server";
import { badgeVariants } from "@turbostarter/ui-web/badge";

import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "~/components/common/layout/section";
import { Mdx } from "~/components/common/mdx";
import { BLOG_PREFIX } from "~/config/paths";
import { getMetadata } from "~/lib/metadata";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { t } = await getTranslation({ ns: "marketing" });
  const item = getContentItemBySlug({
    collection: CollectionType.BLOG,
    slug: (await params).slug,
    locale: (await params).locale,
  });

  if (!item) {
    return notFound();
  }

  return (
    <Section>
      <SectionHeader className="max-w-3xl">
        <div className="mr-auto flex flex-wrap gap-1 md:gap-1.5">
          {item.tags.map((tag) => (
            <Link
              key={tag}
              href={`${BLOG_PREFIX}?tag=${tag}`}
              className={badgeVariants({ variant: "outline" })}
            >
              {t(`blog.tag.${tag}`)}
            </Link>
          ))}
        </div>
        <SectionTitle as="h1" className="mt-2 text-left">
          {item.title}
        </SectionTitle>
        <div className="mr-auto flex flex-wrap items-center gap-1.5 text-muted-foreground">
          <time
            className="text-muted-foreground"
            dateTime={item.publishedAt.toISOString()}
          >
            {dayjs(item.publishedAt).format("MMMM D, YYYY")}
          </time>

          {item.timeToRead && <span>·</span>}
          {typeof item.timeToRead !== "undefined" && (
            <span>
              {t("blog.timeToRead", {
                time: Math.ceil(dayjs.duration(item.timeToRead).asMinutes()),
              })}
            </span>
          )}
        </div>

        <SectionDescription className="text-left">
          {item.description}
        </SectionDescription>

        <div className="relative -mx-2 mt-4 aspect-[12/8] w-[calc(100%+1rem)]">
          <Image
            alt=""
            fill
            src={item.thumbnail}
            className="rounded-lg object-cover"
          />
        </div>
      </SectionHeader>

      <Mdx mdx={item.mdx} />
    </Section>
  );
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
