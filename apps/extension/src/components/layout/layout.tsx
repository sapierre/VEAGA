import { cn } from "@turbostarter/ui";
import "@turbostarter/ui/globals";

import { ErrorBoundary } from "~components/common/error-boundary";
import { Suspense } from "~components/common/suspense";
import { Footer } from "~components/layout/footer";
import "~styles/globals.css";

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
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>
        <div className="flex min-h-screen w-full min-w-72 flex-col items-center justify-center bg-background font-sans text-base text-foreground">
          <div
            className={cn(
              "flex w-full max-w-[80rem] grow flex-col items-center justify-between gap-6 p-4",
              className,
            )}
          >
            {children}
            <Footer />
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
