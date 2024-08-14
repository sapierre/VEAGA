import { DM_Mono, DM_Sans } from "next/font/google";

import "@turbostarter/ui/globals";

import { Footer } from "~/components/common/layout/footer";
import { Providers } from "~/providers/providers";
import "~/styles/globals.css";

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
      <body className="flex min-h-screen flex-col items-center justify-center bg-background font-sans text-foreground antialiased">
        <Providers>
          <div className="flex w-full max-w-[80rem] grow flex-col items-center gap-10 p-6 sm:p-8 md:p-10 lg:gap-12 lg:p-12">
            {props.children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
