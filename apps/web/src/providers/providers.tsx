import { ThemeProvider } from "next-themes";
import { memo } from "react";
import { TRPCReactProvider } from "~/trpc/react";

type ProvidersProps = {
  readonly children: React.ReactNode;
};

export const Providers = memo<ProvidersProps>(({ children }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  );
});

Providers.displayName = "Providers";
