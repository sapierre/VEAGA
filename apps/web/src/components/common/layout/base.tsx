import { DM_Mono } from "next/font/google";
import { DM_Sans } from "next/font/google";

import { cn } from "@turbostarter/ui";

import { TailwindIndicator } from "~/components/common/tailwind-indicator";
import { appConfig } from "~/config/app";

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});

interface BaseLayoutProps {
  readonly locale: string;
  readonly children: React.ReactNode;
}

export const BaseLayout = ({ children, locale }: BaseLayoutProps) => {
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(sans.variable, mono.variable)}
      data-theme={appConfig.theme.color}
    >
      <body className="flex min-h-screen flex-col items-center justify-center bg-background font-sans text-foreground antialiased">
        {children}
        <TailwindIndicator />
      </body>
    </html>
  );
};
