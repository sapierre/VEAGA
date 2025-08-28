import { MDXContent } from "@content-collections/mdx/react";

interface MdxProps {
  readonly mdx: string;
}

export const Mdx = ({ mdx }: MdxProps) => {
  return (
    <div className="prose py-6 dark:prose-invert prose-headings:font-semibold">
      <MDXContent code={mdx} />
    </div>
  );
};
