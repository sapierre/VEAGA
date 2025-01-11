"use client";

import { toast } from "sonner";

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

import { appConfig } from "~/config/app";
import { deleteUser } from "~/lib/auth/client";

export const DeleteAccount = () => {
  return (
    <Card className="h-fit w-full max-w-3xl overflow-hidden border-destructive/25 dark:border-destructive/50">
      <CardHeader>
        <CardTitle className="text-xl">Delete Account</CardTitle>
        <CardDescription className="flex flex-col gap-1 py-1.5 text-foreground">
          Permanently remove your Personal Account and all of its contents from
          the {appConfig.name} platform. This action is not reversible, so
          please continue with caution.
        </CardDescription>
      </CardHeader>

      <CardFooter className="min-h-14 border-t border-t-destructive/25 bg-destructive/15 py-3 text-sm text-muted-foreground dark:border-t-destructive/50 dark:bg-destructive/40">
        <ConfirmModal>
          <Button size="sm" className="ml-auto" variant="destructive">
            Delete Account
          </Button>
        </ConfirmModal>
      </CardFooter>
    </Card>
  );
};

const ConfirmModal = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useBreakpoint("md");

  const deleteAccount = async () => {
    const loadingToast = toast.loading("Sending confirmation link...");

    await deleteUser({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Confirmation link sent, check your inbox!", {
            id: loadingToast,
          });
        },
        onError: ({ error }) => {
          toast.error(error.message, { id: loadingToast });
        },
      },
    });
  };

  const renderDescription = () => (
    <>
      You are about to delete your Personal Account.
      <br />
      <br />
      After deleting your account, all your data will be permanently deleted and
      cannot be recovered. We will send you a confirmation link to verify this
      action.
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
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>{renderDescription()}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={deleteAccount} variant="destructive">
                Send confirmation link
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
          <DrawerTitle>Delete Account</DrawerTitle>
          <DrawerDescription>{renderDescription()}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button onClick={deleteAccount} variant="destructive">
            Send confirmation link
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
