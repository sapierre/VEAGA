import { useStorage } from "@plasmohq/storage/hook";

import { ThemeMode, cn } from "@turbostarter/ui";

import { ErrorBoundary } from "~/components/common/error-boundary";
import { Suspense } from "~/components/common/suspense";
import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";
import { TRPCProvider } from "~/lib/api/trpc";
import { STORAGE_KEY } from "~/lib/storage";
import "~/styles/globals.css";

import type { ThemeConfig } from "@turbostarter/ui";

interface LayoutProps {
  readonly children: React.ReactElement;
  readonly loadingFallback?: React.ReactElement;
  readonly errorFallback?: React.ReactElement;
  readonly className?: string;
}

export const Layout = ({
  children,
  loadingFallback,
  errorFallback,
  className,
}: LayoutProps) => {
  const [config] = useStorage<ThemeConfig>(STORAGE_KEY.THEME);

  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>
        <TRPCProvider>
          <div
            id="root"
            className={cn(
              "flex min-h-screen w-full min-w-[23rem] flex-col items-center justify-center font-sans text-base",
              {
                dark:
                  config?.mode === ThemeMode.DARK ||
                  (config?.mode === ThemeMode.SYSTEM &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches),
              },
            )}
          >
            <div
              className="flex-1 bg-background text-foreground"
              data-theme={config?.color}
            >
              <div
                className={cn(
                  "flex w-full max-w-[80rem] grow flex-col items-center justify-between gap-16 p-4",
                  className,
                )}
              >
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </div>
        </TRPCProvider>
      </Suspense>
    </ErrorBoundary>
  );
};
