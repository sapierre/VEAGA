import "@turbostarter/tailwind-config/variables";
import { DM_Sans } from "next/font/google";

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={sans.variable}>
      <body className="min-h-screen bg-destructive font-sans text-foreground antialiased">
        {props.children}
      </body>
    </html>
  );
}
