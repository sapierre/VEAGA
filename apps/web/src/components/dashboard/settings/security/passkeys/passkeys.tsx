"use client";

import { isKey, useTranslation } from "@turbostarter/i18n";
import { useBreakpoint } from "@turbostarter/ui-web";
import { Button } from "@turbostarter/ui-web/button";
import {
  Card,
  CardContent,
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
import { Icons } from "@turbostarter/ui-web/icons";
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { usePasskeys } from "./use-passkeys";

export const Passkeys = () => {
  const { t, i18n } = useTranslation(["auth", "common"]);

  const { passkeys, isLoading, add, remove } = usePasskeys();

  return (
    <Card className="h-fit w-full overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{t("account.passkeys.title")}</CardTitle>
        <CardDescription className="flex flex-col gap-1 py-1.5 text-foreground">
          {t("account.passkeys.description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading && <Skeleton className="mb-6 h-24" />}

        {passkeys.length > 0 && (
          <ul className="mb-5 overflow-hidden rounded-md border">
            {passkeys.map((passkey) => {
              return (
                <li
                  key={passkey.id}
                  className="flex min-w-0 items-center gap-3 border-b px-4 py-3 last:border-b-0"
                >
                  <Icons.Key className="size-6 shrink-0" />

                  <div className="mr-auto grid grid-cols-1">
                    <span className="truncate text-sm font-medium capitalize">
                      {isKey(
                        `account.passkeys.type.${passkey.deviceType}`,
                        i18n,
                      )
                        ? t(`account.passkeys.type.${passkey.deviceType}`)
                        : passkey.deviceType}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {t("account.passkeys.addedAt", {
                        date: passkey.createdAt.toLocaleDateString(
                          i18n.language,
                        ),
                      })}
                    </span>
                  </div>

                  <ConfirmModal onConfirm={() => remove.mutate(passkey.id)}>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={remove.isPending}
                      className="shrink-0"
                    >
                      <span className="sr-only">
                        {t("account.passkeys.remove.cta")}
                      </span>
                      {remove.isPending && remove.variables === passkey.id ? (
                        <Icons.Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Icons.Trash className="size-4" />
                      )}
                    </Button>
                  </ConfirmModal>
                </li>
              );
            })}
          </ul>
        )}

        <Button
          variant="outline"
          className="w-full gap-2"
          disabled={add.isPending}
          onClick={() => add.mutate()}
        >
          {add.isPending ? (
            <Icons.Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <Icons.Plus className="size-4" />
              {t("account.passkeys.add.cta")}
            </>
          )}
        </Button>
      </CardContent>

      <CardFooter className="min-h-14 border-t bg-muted/75 py-3 text-sm text-muted-foreground dark:bg-card">
        <span>{t("account.passkeys.info")}</span>
      </CardFooter>
    </Card>
  );
};

const ConfirmModal = ({
  children,
  onConfirm,
}: {
  children: React.ReactNode;
  onConfirm: () => void;
}) => {
  const { t } = useTranslation(["common", "auth"]);
  const isDesktop = useBreakpoint("md");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("account.passkeys.remove.cta")}</DialogTitle>
            <DialogDescription className="whitespace-pre-line">
              {t("account.passkeys.remove.disclaimer")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={onConfirm}>{t("continue")}</Button>
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
          <DrawerTitle>{t("account.passkeys.remove.cta")}</DrawerTitle>
          <DrawerDescription className="whitespace-pre-line">
            {t("account.passkeys.remove.disclaimer")}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">{t("cancel")}</Button>
          </DrawerClose>
          <Button onClick={onConfirm}>{t("continue")}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
