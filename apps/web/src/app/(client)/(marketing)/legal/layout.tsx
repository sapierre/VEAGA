import { DocsLayout } from "fumadocs-ui/layout";

import { pageTree } from "~/lib/content/legal";

export default function LegalLayout(props: { children: React.ReactNode }) {
  return (
    <div className="w-full self-start">
      <DocsLayout
        tree={pageTree}
        sidebar={{ enabled: false }}
        nav={{ enabled: false }}
      >
        {props.children}
      </DocsLayout>
    </div>
  );
}
