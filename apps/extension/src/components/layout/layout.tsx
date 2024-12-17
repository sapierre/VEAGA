import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { ThemeMode, cn } from "@turbostarter/ui";

import "~/assets/styles/globals.css";
import { ErrorBoundary } from "~/components/common/error-boundary";
import { Suspense } from "~/components/common/suspense";
import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";
import { TRPCProvider } from "~/lib/api/trpc";
import { StorageKey, useStorage } from "~/lib/storage";

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
  const { data } = useStorage(StorageKey.THEME);

  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>
        <TRPCProvider>
          <div
            className={cn(
              "flex min-h-screen w-full min-w-[23rem] flex-col font-sans text-base",
              {
                dark:
                  data.mode === ThemeMode.DARK ||
                  (data.mode === ThemeMode.SYSTEM &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches),
              },
            )}
          >
            <div
              className="flex w-full grow justify-center bg-background text-foreground"
              data-theme={data.color}
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

export const render = (id: string, element: React.ReactElement) => {
  const container = document.getElementById(id);
  if (container) {
    ReactDOM.createRoot(container).render(<StrictMode>{element}</StrictMode>);
  }
};
