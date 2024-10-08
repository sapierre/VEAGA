import { MDXContent } from "@content-collections/mdx/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { badgeVariants } from "@turbostarter/ui-web/badge";

interface MdxProps {
  readonly data: {
    readonly title: string;
    readonly description: string;
    readonly mdx: string;
    readonly thumbnail?: string;
    readonly publishedAt?: Date;
    readonly tags?: string[];
    readonly timeToRead?: string;
  };
  readonly base: string;
}

export const Mdx = memo<MdxProps>(({ data, base }) => {
  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 self-start md:mx-auto">
      {data.tags && (
        <div className="mb-1 flex flex-wrap gap-1 md:gap-1.5">
          {data.tags.map((tag) => (
            <Link
              key={tag}
              href={`${base}?tag=${tag}`}
              className={badgeVariants({ variant: "outline" })}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      <h1 className="text-pretty text-4xl font-bold tracking-tight md:text-5xl">
        {data.title}
      </h1>

      <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {data.publishedAt && (
          <>
            <time
              className="text-muted-foreground"
              dateTime={data.publishedAt.toISOString()}
            >
              {dayjs(data.publishedAt).format("MMMM D, YYYY")}
            </time>
          </>
        )}

        {data.publishedAt && data.timeToRead && <span>·</span>}
        {data.timeToRead && <span>{data.timeToRead}</span>}
      </div>

      <p className="mb-2 text-base text-muted-foreground">{data.description}</p>

      {data.thumbnail && (
        <div className="relative -mx-2 aspect-[12/8]">
          <Image
            alt=""
            fill
            src={data.thumbnail}
            className="rounded-lg object-cover"
          />
        </div>
      )}
      <div className="prose py-6 dark:prose-invert">
        <MDXContent code={data.mdx} />
      </div>
    </div>
  );
});

Mdx.displayName = "Mdx";
