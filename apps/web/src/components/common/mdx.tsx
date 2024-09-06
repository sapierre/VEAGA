import { MDXContent } from "@content-collections/mdx/react";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { memo } from "react";

import type { TableOfContents } from "fumadocs-core/server";

interface MdxProps {
  readonly data: {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly toc: TableOfContents;
  };
}

export const Mdx = memo<MdxProps>(({ data }) => {
  return (
    <DocsPage
      toc={data.toc}
      footer={{ enabled: false }}
      tableOfContent={{ footer: <div className="md:h-10" /> }}
    >
      <div className="mx-auto max-w-2xl">
        <DocsTitle className="text-balance text-left text-4xl font-bold tracking-tight md:text-5xl">
          {data.title}
        </DocsTitle>

        <DocsDescription className="mt-4 text-base">
          {data.description}
        </DocsDescription>

        <DocsBody className="py-6">
          <MDXContent code={data.body} />
        </DocsBody>
      </div>
    </DocsPage>
  );
});

Mdx.displayName = "Mdx";
