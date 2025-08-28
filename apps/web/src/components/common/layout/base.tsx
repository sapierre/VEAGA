import { Geist_Mono, Geist } from "next/font/google";

import { cn } from "@turbostarter/ui";

import { appConfig } from "~/config/app";

const sans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = Geist_Mono({
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
      </body>
    </html>
  );
};
