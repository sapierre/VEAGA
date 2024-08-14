import { DM_Mono, DM_Sans } from "next/font/google";

import "@turbostarter/ui/globals";

import { Providers } from "~/providers/providers";
import "~/styles/globals.css";
import { Footer } from "~/components/common/layout/footer";

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

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col items-center justify-center bg-background pb-6 font-sans text-foreground antialiased sm:pb-8 md:pb-10 lg:pb-12">
        <Providers>
          {props.children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
