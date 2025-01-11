"use client";

import { SOCIAL_PROVIDER } from "@turbostarter/auth";
import { capitalize } from "@turbostarter/shared/utils";
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
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
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

import { appConfig } from "~/config/app";

import { useAccounts } from "./hooks/use-accounts";

import type { SVGProps } from "react";

const ICONS: Record<SOCIAL_PROVIDER, React.FC<SVGProps<SVGElement>>> = {
  [SOCIAL_PROVIDER.GITHUB]: Icons.Github,
  [SOCIAL_PROVIDER.GOOGLE]: Icons.Google,
};

export const Accounts = () => {
  const { accounts, socials, missing, isLoading, connect, disconnect } =
    useAccounts();

  return (
    <Card className="h-fit w-full max-w-3xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Connections</CardTitle>
        <CardDescription className="flex flex-col gap-1 py-1.5 text-foreground">
          Connect your {appConfig.name} Account with a third-party service to
          use it for login.
        </CardDescription>
      </CardHeader>

      {isLoading && <Skeleton className="m-6 mt-0 h-24" />}

      {socials.length > 0 && !isLoading && (
        <ul className="m-6 mt-0 overflow-hidden rounded-md border">
          {socials.map((social) => {
            const provider = social.provider as SOCIAL_PROVIDER;
            const Icon = ICONS[provider];

            return (
              <li
                key={social.accountId}
                className="flex items-center gap-3 border-b px-4 py-3 last:border-b-0"
              >
                <Icon className="size-8" />

                <div className="mr-auto flex flex-col">
                  <span className="text-sm font-medium capitalize">
                    {social.provider}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Connected at {social.updatedAt.toLocaleDateString()}
                  </span>
                </div>

                <ConfirmModal
                  provider={provider}
                  onConfirm={() => disconnect.mutate(provider)}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={accounts.length === 1 || disconnect.isPending}
                  >
                    <span className="sr-only">Disconnect</span>
                    {disconnect.isPending &&
                    disconnect.variables === provider ? (
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

      {missing.length > 0 && !isLoading && (
        <CardFooter className="m-6 mt-0 flex-col items-start gap-3 rounded-md border px-4 py-3">
          <span className="text-sm font-medium">Add New</span>

          <hr className="w-full bg-border" />
          <div className="flex flex-wrap gap-2">
            {missing.map((provider) => {
              const Icon = ICONS[provider as SOCIAL_PROVIDER];

              return (
                <Button
                  variant="outline"
                  className="gap-2 px-3 capitalize"
                  key={provider}
                  disabled={connect.isPending}
                  onClick={() => connect.mutate(provider)}
                >
                  {connect.isPending && connect.variables === provider ? (
                    <Icons.Loader2 className="size-7 animate-spin" />
                  ) : (
                    <Icon className="size-7" />
                  )}
                  {provider}
                </Button>
              );
            })}
          </div>
        </CardFooter>
      )}

      <CardFooter className="min-h-14 border-t bg-muted/75 py-3 text-sm text-muted-foreground dark:bg-card">
        <span>
          We only access basic profile information for secure sign-in.
        </span>
      </CardFooter>
    </Card>
  );
};

const ConfirmModal = ({
  provider,
  children,
  onConfirm,
}: {
  provider: SOCIAL_PROVIDER;
  children: React.ReactNode;
  onConfirm: () => void;
}) => {
  const isDesktop = useBreakpoint("md");

  const renderDescription = () => (
    <>
      You are about to remove the Login Connection for {capitalize(provider)}.
      <br />
      <br />
      After removing it, you won't be able to use {capitalize(provider)} to log
      into your Personal Account anymore.
      <br />
      <br />
      Do you want to continue?
    </>
  );

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnect {capitalize(provider)}</DialogTitle>
            <DialogDescription>{renderDescription()}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={onConfirm}>Continue</Button>
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
          <DrawerTitle>Disconnect {capitalize(provider)}</DrawerTitle>
          <DrawerDescription>{renderDescription()}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button onClick={onConfirm}>Continue</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
