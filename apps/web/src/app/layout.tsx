import { DM_Sans } from "next/font/google";

import "@turbostarter/ui/globals";

import { Providers } from "~/providers/providers";
import "~/styles/globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={sans.variable}>
      <body className="min-h-screen bg-muted font-sans text-foreground antialiased">
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
