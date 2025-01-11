import { DM_Mono, DM_Sans } from "next/font/google";

import "~/assets/styles/globals.css";
import { TailwindIndicator } from "~/components/common/tailwind-indicator";
import { Toaster } from "~/components/common/toast";
import { appConfig } from "~/config/app";
import { DEFAULT_VIEWPORT, DEFAULT_METADATA } from "~/lib/metadata";
import { Providers } from "~/providers/providers";

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

export const viewport = DEFAULT_VIEWPORT;
export const metadata = DEFAULT_METADATA;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
      data-theme={appConfig.theme.color}
    >
      <body className="flex min-h-screen flex-col items-center justify-center bg-background font-sans text-foreground antialiased">
        <Providers>
          {children}
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
