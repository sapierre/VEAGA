import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { memo, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";

import { otpSchema } from "@turbostarter/auth";
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
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  Form,
} from "@turbostarter/ui-web/form";
import { Icons } from "@turbostarter/ui-web/icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@turbostarter/ui-web/input-otp";

import { useCopyToClipboard } from "~/lib/hooks/use-copy-to-clipboard";

import { RequirePassword } from "../../require-password";
import { BackupCodesModal } from "../backup-codes/backup-codes";
import { useTwoFactor } from "../use-two-factor";

import { useTotp } from "./use-totp";

import type { OtpPayload, PasswordPayload } from "@turbostarter/auth";
import type { UseFormReturn } from "react-hook-form";

interface CodeFormProps {
  readonly form: UseFormReturn<OtpPayload>;
  readonly onSubmit: (data: OtpPayload) => Promise<void>;
  readonly children: React.ReactNode;
}

const CodeForm = memo<CodeFormProps>(({ form, onSubmit, children }) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center space-y-4 md:space-y-6"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  disabled={form.formState.isSubmitting}
                  onComplete={form.handleSubmit(onSubmit)}
                  {...field}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
});

CodeForm.displayName = "CodeForm";

interface TotpModalProps {
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
}

export const TotpModal = ({ open, onOpenChange }: TotpModalProps) => {
  const { resolvedTheme } = useTheme();
  const [backupCodesOpen, setBackupCodesOpen] = useState(false);
  const { t, errorMap } = useTranslation(["common", "auth"]);
  const isDesktop = useBreakpoint("md");

  const { uri, verify } = useTotp();
  const form = useForm<OtpPayload>({
    resolver: zodResolver(otpSchema, { errorMap }),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: OtpPayload) => {
    try {
      if (document.activeElement && "blur" in document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
      await verify.mutateAsync(data);
      onOpenChange?.(false);
      setBackupCodesOpen(true);
    } catch (error) {
      setTimeout(() => form.setFocus("code"), 0);
      throw error;
    }
  };

  if (isDesktop) {
    return (
      <>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {t("account.twoFactor.totp.enable.title")}
              </DialogTitle>
              <DialogDescription className="whitespace-pre-line">
                {t("account.twoFactor.totp.enable.description")}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2 flex w-full flex-col-reverse items-center gap-2">
              <CodeForm form={form} onSubmit={onSubmit}>
                <DialogFooter className="flex w-full justify-end">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      {t("close")}
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Icons.Loader2 className="size-4 animate-spin" />
                    ) : (
                      t("continue")
                    )}
                  </Button>
                </DialogFooter>
              </CodeForm>

              <QRCode
                value={uri}
                size={180}
                bgColor="transparent"
                fgColor={resolvedTheme === "dark" ? "#fff" : "#000"}
              />

              <Secret />
            </div>
          </DialogContent>
        </Dialog>
        <BackupCodesModal
          open={backupCodesOpen}
          onOpenChange={setBackupCodesOpen}
        />
      </>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="pb-4">
            <DrawerTitle>
              {t("account.twoFactor.totp.enable.title")}
            </DrawerTitle>
            <DrawerDescription className="whitespace-pre-line">
              {t("account.twoFactor.totp.enable.description")}
            </DrawerDescription>
          </DrawerHeader>
          <div className="mt-2 flex w-full flex-col-reverse items-center gap-2">
            <CodeForm form={form} onSubmit={onSubmit}>
              <DrawerFooter className="w-full">
                <DrawerClose asChild>
                  <Button variant="outline" type="button">
                    {t("close")}
                  </Button>
                </DrawerClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <Icons.Loader2 className="size-4 animate-spin" />
                  ) : (
                    t("continue")
                  )}
                </Button>
              </DrawerFooter>
            </CodeForm>

            <QRCode
              value={uri}
              size={180}
              bgColor="transparent"
              fgColor={resolvedTheme === "dark" ? "#fff" : "#000"}
            />

            <Secret />
          </div>
        </DrawerContent>
      </Drawer>
      <BackupCodesModal
        open={backupCodesOpen}
        onOpenChange={setBackupCodesOpen}
      />
    </>
  );
};

const Secret = () => {
  const { uri } = useTotp();
  const [showCheck, setShowCheck] = useState(false);

  const [, copy] = useCopyToClipboard();

  const secret = useMemo(() => {
    return uri ? new URL(uri).searchParams.get("secret") : null;
  }, [uri]);

  const handleCopy = async () => {
    const success = await copy(secret ?? "");
    if (!success) {
      return;
    }

    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 2000);
  };

  if (!secret) {
    return null;
  }

  return (
    <span className="mb-1 inline-block w-full gap-2 text-balance px-6 text-center leading-none">
      <span className="text-balance break-all font-mono text-sm leading-none">
        {secret}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="ml-1 size-6"
        type="button"
        onClick={handleCopy}
      >
        {showCheck ? (
          <Icons.Check className="size-3" />
        ) : (
          <Icons.Copy className="size-3" />
        )}
      </Button>
    </span>
  );
};

export const TotpTile = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(["common", "auth"]);
  const { enabled } = useTwoFactor();

  const { setUri, getUri } = useTotp();

  const onEdit = async (data: PasswordPayload) => {
    const response = await getUri.mutateAsync(data);
    setUri(response.totpURI);
    setOpen(true);
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-md border p-4">
      <div>
        <span className="text-sm font-medium">
          {t("account.twoFactor.totp.title")}
        </span>
        <p className="text-sm text-muted-foreground">
          {t("account.twoFactor.totp.description")}
        </p>
      </div>

      <RequirePassword onConfirm={onEdit}>
        <Button variant="outline" disabled={!enabled}>
          {enabled ? t("edit") : t("add")}
        </Button>
      </RequirePassword>
      <TotpModal open={open} onOpenChange={setOpen} />
    </div>
  );
};
