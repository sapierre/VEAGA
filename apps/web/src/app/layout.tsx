import "@turbostarter/tailwind-config/variables";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-destructive font-sans text-foreground antialiased">
        {props.children}
      </body>
    </html>
  );
}
