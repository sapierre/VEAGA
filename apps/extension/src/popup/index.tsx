// import { APP_LINK } from "@turbostarter/shared";
import { Icons } from "@turbostarter/ui";
import "@turbostarter/ui/globals";

import "~styles/globals.css";

const Popup = () => {
  return (
    <div className="flex w-64 flex-col items-center justify-center gap-4 bg-background px-8 py-6 font-sans text-base text-foreground">
      <Icons.Logo className="w-20 animate-pulse text-primary" />
      <p className="text-pretty text-center leading-tight">
        Edit{" "}
        <code className="inline-block rounded-sm bg-muted px-1.5 text-sm text-muted-foreground">
          src/popup
        </code>{" "}
        and save to reload.
      </p>
      <a
        // href={APP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 text-sm text-primary underline hover:no-underline"
      >
        Learn more
      </a>
    </div>
  );
};

export default Popup;
