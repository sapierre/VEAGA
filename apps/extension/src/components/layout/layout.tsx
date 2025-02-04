import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";

import { I18nProvider } from "@turbostarter/i18n";
import { ThemeMode, cn } from "@turbostarter/ui";

import "~/assets/styles/globals.css";
import { ErrorBoundary } from "~/components/common/error-boundary";
import { Suspense } from "~/components/common/suspense";
import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";
import { appConfig } from "~/config/app";
import { ApiProvider } from "~/lib/api";
import { useLocale } from "~/lib/i18n";
import { StorageKey, useStorage } from "~/lib/storage";

const I18n = ({ children }: { children: React.ReactNode }) => {
  const { data: locale, isLoading } = useLocale();

  useEffect(() => {
    if (locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  if (isLoading) return null;

  return (
    <I18nProvider locale={locale} defaultLocale={appConfig.locale}>
      {children}
    </I18nProvider>
  );
};

interface ProvidersProps {
  readonly children: React.ReactNode;
  readonly loadingFallback?: React.ReactNode;
  readonly errorFallback?: React.ReactNode;
}

const Providers = ({
  children,
  loadingFallback,
  errorFallback,
}: ProvidersProps) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>
        <ApiProvider>
          <I18n>{children}</I18n>
        </ApiProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

type LayoutProps = ProvidersProps & {
  readonly className?: string;
};

export const Layout = ({ children, className, ...props }: LayoutProps) => {
  const { data: theme } = useStorage(StorageKey.THEME);

  return (
    <Providers {...props}>
      <div
        data-theme={theme.color}
        className={cn(
          "flex min-h-screen w-full min-w-[23rem] flex-col bg-background font-sans text-base text-foreground",
          {
            dark:
              theme.mode === ThemeMode.DARK ||
              (theme.mode === ThemeMode.SYSTEM &&
                window.matchMedia("(prefers-color-scheme: dark)").matches),
          },
        )}
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
    </Providers>
  );
};

export const render = (id: string, element: React.ReactElement) => {
  const container = document.getElementById(id);
  if (container) {
    ReactDOM.createRoot(container).render(<StrictMode>{element}</StrictMode>);
  }
};
