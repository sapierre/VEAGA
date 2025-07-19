import { useCallback, useState } from "react";

import { useTranslation } from "@turbostarter/i18n";
import { useBreakpoint } from "@turbostarter/ui-web";
import { Button } from "@turbostarter/ui-web/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@turbostarter/ui-web/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@turbostarter/ui-web/drawer";
import { Icons } from "@turbostarter/ui-web/icons";

import { useCopyToClipboard } from "~/lib/hooks/use-copy-to-clipboard";

import { RequirePassword } from "../../require-password";
import { useTwoFactor } from "../use-two-factor";

import { useBackupCodes } from "./use-backup-codes";

interface BackupCodesModalProps {
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
}

export const BackupCodesModal = ({
  open,
  onOpenChange: _onOpenChange,
}: BackupCodesModalProps) => {
  const { t } = useTranslation(["common", "auth"]);
  const isDesktop = useBreakpoint("md");

  const { codes, setCodes } = useBackupCodes();

  const onOpenChange = useCallback(
    (open: boolean) => {
      _onOpenChange?.(open);

      if (!open) {
        setCodes([]);
      }
    },
    [_onOpenChange, setCodes],
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("account.twoFactor.backupCodes.save.title")}
            </DialogTitle>
            <DialogDescription>
              {t("account.twoFactor.backupCodes.save.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full flex-col items-center gap-4">
            <div className="w-full overflow-hidden rounded-md border">
              <div className="grid grid-cols-2 gap-2 border-b bg-muted/25 py-1">
                {codes.map((code) => (
                  <code
                    key={code}
                    className="rounded p-1.5 text-center font-mono text-sm"
                  >
                    {code}
                  </code>
                ))}
              </div>

              <div className="flex justify-end p-2">
                <Download />
                <Copy />
              </div>
            </div>

            <DialogFooter className="flex w-full justify-end gap-2">
              <DialogClose asChild>
                <Button>{t("continue")}</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="pb-4">
          <DrawerTitle>
            {t("account.twoFactor.backupCodes.save.title")}
          </DrawerTitle>
          <DrawerDescription>
            {t("account.twoFactor.backupCodes.save.description")}
          </DrawerDescription>
        </DrawerHeader>

        <div className="mx-6 overflow-hidden rounded-md border">
          <div className="grid grid-cols-2 gap-2 border-b bg-muted/25 py-1">
            {codes.map((code) => (
              <code
                key={code}
                className="rounded p-1.5 text-center font-mono text-sm"
              >
                {code}
              </code>
            ))}
          </div>

          <div className="flex justify-end p-2">
            <Download />
            <Copy />
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button>{t("continue")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const Copy = () => {
  const { t } = useTranslation("common");
  const [_, copy] = useCopyToClipboard();
  const [showCheck, setShowCheck] = useState(false);

  const { codes } = useBackupCodes();

  const handleCopy = async () => {
    const success = await copy(codes.join("\n"));
    if (!success) {
      return;
    }

    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 2000);
  };

  return (
    <Button
      variant="ghost"
      className="h-auto gap-1.5 px-3 py-1.5"
      onClick={handleCopy}
    >
      {showCheck ? (
        <Icons.Check className="size-4" />
      ) : (
        <Icons.Copy className="size-4" />
      )}
      {t("copy")}
    </Button>
  );
};

const Download = () => {
  const { t } = useTranslation("common");
  const { codes } = useBackupCodes();

  const handleDownload = () => {
    const blob = new Blob([codes.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="ghost"
      className="h-auto gap-1.5 px-3 py-1.5"
      onClick={handleDownload}
    >
      <Icons.Download className="size-4" />
      {t("download")}
    </Button>
  );
};

export const BackupCodesTile = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(["common", "auth"]);
  const { enabled } = useTwoFactor();
  const { generate } = useBackupCodes();

  return (
    <>
      <div className="flex items-center justify-between gap-4 rounded-md border p-4">
        <div>
          <span className="text-sm font-medium">
            {t("account.twoFactor.backupCodes.title")}
          </span>
          <p className="text-sm text-muted-foreground">
            {t("account.twoFactor.backupCodes.description")}
          </p>
        </div>

        <RequirePassword
          onConfirm={async (data) => {
            await generate.mutateAsync(data);
            setOpen(true);
          }}
        >
          <Button variant="outline" disabled={!enabled}>
            {t("regenerate")}
          </Button>
        </RequirePassword>
      </div>

      <BackupCodesModal open={open} onOpenChange={setOpen} />
    </>
  );
};
