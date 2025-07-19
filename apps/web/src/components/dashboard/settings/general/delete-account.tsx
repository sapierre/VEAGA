"use client";

import { toast } from "sonner";

import { useTranslation } from "@turbostarter/i18n";
import { useBreakpoint } from "@turbostarter/ui-web";
import { Button } from "@turbostarter/ui-web/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@turbostarter/ui-web/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@turbostarter/ui-web/drawer";

import { deleteUser } from "~/lib/auth/client";

export const DeleteAccount = () => {
  const { t } = useTranslation("auth");

  return (
    <Card className="h-fit w-full overflow-hidden border-destructive/25 dark:border-destructive/50">
      <CardHeader>
        <CardTitle className="text-xl">{t("account.delete.title")}</CardTitle>
        <CardDescription className="flex flex-col gap-1 pb-1.5 text-foreground">
          {t("account.delete.description")}
        </CardDescription>
      </CardHeader>

      <CardFooter className="min-h-14 border-t border-t-destructive/25 bg-destructive/15 py-3 text-sm text-muted-foreground dark:border-t-destructive/50 dark:bg-destructive/40">
        <ConfirmModal>
          <Button size="sm" className="ml-auto" variant="destructive">
            {t("account.delete.cta")}
          </Button>
        </ConfirmModal>
      </CardFooter>
    </Card>
  );
};

const ConfirmModal = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation(["common", "auth"]);
  const isDesktop = useBreakpoint("md");

  const deleteAccount = async () => {
    const loadingToast = toast.loading(
      t("account.delete.confirmation.loading"),
    );

    await deleteUser({
      fetchOptions: {
        onSuccess: () => {
          toast.success(t("account.delete.confirmation.success"), {
            id: loadingToast,
          });
        },
        onError: ({ error }) => {
          toast.error(error.message, { id: loadingToast });
        },
      },
    });
  };

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("account.delete.title")}</DialogTitle>
            <DialogDescription className="whitespace-pre-line">
              {t("account.delete.disclaimer")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={deleteAccount} variant="destructive">
                {t("account.delete.confirmation.cta")}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("account.delete.title")}</DrawerTitle>
          <DrawerDescription className="whitespace-pre-line">
            {t("account.delete.disclaimer")}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DrawerClose>
          <Button onClick={deleteAccount} variant="destructive">
            {t("account.delete.confirmation.cta")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
