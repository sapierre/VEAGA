import { Logo } from "~/components/shared";
import { buttonVariants } from "~/components/web/button";

interface BuiltWithProps {
  readonly href: string;
}

export const BuiltWith = ({ href }: BuiltWithProps) => {
  return (
    <a
      className={buttonVariants({
        variant: "outline",
        className: "cursor-pointer",
      })}
      href={href}
      target="_blank"
    >
      Built with{" "}
      <Logo
        withText
        asLink={false}
        className="ml-1.5"
        logoClassName="h-[1.35rem] shrink-0"
      />
    </a>
  );
};
