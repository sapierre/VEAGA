import Link from "next/link";

import { Icons } from "@turbostarter/ui";

import { AuthStatus } from "~/components/auth/status";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { HOME_LINKS } from "~/lib/constants";

const HomePage = () => {
  return (
    <div className="flex w-full max-w-[75rem] grow flex-col items-center justify-between gap-20 p-6 sm:p-8 md:p-10 lg:p-12">
      <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row-reverse">
        <AuthStatus />
        <p className="w-full rounded-md border border-input bg-muted/25 px-6 py-3 text-center md:w-fit">
          Edit{" "}
          <code className="rounded-md bg-muted px-2 py-0.5 font-mono">
            app/page.tsx
          </code>{" "}
          and save to reload.
        </p>
      </div>
      <Icons.Logo className="size-36 animate-pulse text-primary" />
      <div className="grid grid-cols-1 items-center justify-center gap-3 sm:grid-cols-2 md:grid-cols-3">
        {HOME_LINKS.map((link) => (
          <Link
            href={link.href}
            className="group w-full cursor-pointer"
            key={link.title}
          >
            <Card className="transition-colors group-hover:bg-muted">
              <CardHeader>
                <CardTitle>
                  {link.title}
                  <Icons.ArrowRight className="ml-1 inline-block size-5 transition-transform group-hover:translate-x-1.5" />
                </CardTitle>
                <CardDescription className="text-pretty">
                  {link.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
