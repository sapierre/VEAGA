"use dom";

import { Logo, Icons } from "@turbostarter/ui";
import {
  BuiltWith,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui/web";

import { DOMLink } from "~/components/common/dom-link";
import { HOME_LINKS } from "~/lib/constants/home";
import "~/styles/globals.css";

export default function Home({
  navigate,
}: {
  dom: import("expo/dom").DOMProps;
  navigate: (typeof import("expo-router").router)["navigate"];
}) {
  return (
    <div className="bg-background flex w-full grow flex-col items-center justify-between p-6">
      <p className="border-input bg-muted/25 w-full text-pretty rounded-md border px-6 py-3 text-center md:w-fit">
        Edit{" "}
        <code className="bg-muted rounded-md px-2 py-0.5 font-mono">
          app/index.tsx
        </code>{" "}
        and save to reload.
      </p>

      <Logo logoClassName="h-32 animate-pulse" className="py-20" />
      <div className="grid grid-cols-1 items-stretch justify-center gap-3 sm:grid-cols-2 md:grid-cols-3">
        {HOME_LINKS.map((link) => (
          <DOMLink
            navigate={navigate}
            href={link.href}
            className="group w-full cursor-pointer"
            key={link.title}
          >
            <Card
              className="group-hover:bg-muted h-full transition-colors"
              key={link.title}
            >
              <CardHeader>
                <CardTitle className="text-balance">
                  {link.title}
                  <Icons.ArrowRight className="ml-1 inline-block size-5 transition-transform group-hover:translate-x-1.5" />
                </CardTitle>
                <CardDescription className="text-pretty">
                  {link.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </DOMLink>
        ))}
      </div>

      <div className="py-10">
        <BuiltWith />
      </div>
    </div>
  );
}
