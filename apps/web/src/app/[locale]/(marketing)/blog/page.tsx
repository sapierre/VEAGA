import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

import {
  CollectionType,
  ContentStatus,
  getContentItems,
} from "@turbostarter/cms";
import { getTranslation } from "@turbostarter/i18n/server";
import { SortOrder } from "@turbostarter/shared/constants";
import { Badge } from "@turbostarter/ui-web/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";

import {
  Section,
  SectionBadge,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "~/components/common/layout/section";
import { TurboLink } from "~/components/common/turbo-link";
import { TagsPicker } from "~/components/marketing/blog/tags-picker";
import { pathsConfig } from "~/config/paths";
import { getMetadata } from "~/lib/metadata";

import type { ContentTag } from "@turbostarter/cms";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const generateMetadata = getMetadata({
  title: "marketing:blog.label",
  description: "marketing:blog.description",
  canonical: pathsConfig.marketing.blog.index,
});

export default async function BlogPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ tag?: ContentTag }>;
  params: Promise<{ locale: string }>;
}) {
  const tag = (await searchParams).tag;
  const locale = (await params).locale;

  const { t } = await getTranslation({ ns: "marketing" });
  const { items } = getContentItems({
    collection: CollectionType.BLOG,
    tags: tag ? [tag] : [],
    sortBy: "publishedAt",
    sortOrder: SortOrder.DESCENDING,
    status: ContentStatus.PUBLISHED,
    locale,
  });

  return (
    <Section>
      <SectionHeader className="flex flex-col items-center justify-center gap-3">
        <SectionBadge>{t("blog.label")}</SectionBadge>
        <SectionTitle as="h1">{t("blog.title")}</SectionTitle>
        <SectionDescription>{t("blog.description")}</SectionDescription>
      </SectionHeader>

      <div className="-mt-2 sm:-mt-4 md:-mt-6 lg:-mt-10">
        <TagsPicker />
      </div>

      <div className="grid grid-cols-1 items-start justify-center gap-x-6 gap-y-8 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3 lg:gap-y-16">
        {items.map((post) => (
          <TurboLink
            key={post.slug}
            href={pathsConfig.marketing.blog.post(post.slug)}
            className="group h-full basis-[34rem]"
          >
            <Card className="h-full border-none shadow-none group-hover:bg-muted/50">
              <CardHeader className="space-y-2 p-3 pb-2">
                <div className="-mx-3 -mt-3 mb-3 aspect-[12/8] overflow-hidden rounded-lg bg-muted">
                  <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-105">
                    <Image
                      alt=""
                      fill
                      src={post.thumbnail}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pb-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {t(`blog.tag.${tag}`)}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="leading-tight">{post.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                  <time dateTime={post.publishedAt.toISOString()}>
                    {dayjs(post.publishedAt).format("MMMM D, YYYY")}
                  </time>
                  <span>·</span>
                  <span>
                    {t("blog.timeToRead", {
                      time: Math.ceil(
                        dayjs.duration(post.timeToRead).asMinutes(),
                      ),
                    })}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-3 pt-0">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              </CardContent>
            </Card>
          </TurboLink>
        ))}
      </div>
    </Section>
  );
}
