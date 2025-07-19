"use client";

import { useCallback, useMemo, useState } from "react";

import { useTranslation } from "@turbostarter/i18n";
import { cn } from "@turbostarter/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@turbostarter/ui-web/card";
import { Switch } from "@turbostarter/ui-web/switch";

import { RequirePassword } from "../require-password";

import { BackupCodesTile } from "./backup-codes/backup-codes";
import { useBackupCodes } from "./backup-codes/use-backup-codes";
import { TotpModal, TotpTile } from "./totp/totp";
import { useTotp } from "./totp/use-totp";
import { useTwoFactor } from "./use-two-factor";

import type { PasswordPayload } from "@turbostarter/auth";

export const TwoFactorAuthentication = () => {
  const { t } = useTranslation(["auth", "common"]);
  const [twoFactorOpen, setTwoFactorOpen] = useState(false);
  const [totpOpen, setTotpOpen] = useState(false);

  const { setUri } = useTotp();
  const { setCodes } = useBackupCodes();

  const { enabled, enable, disable } = useTwoFactor();

  const onEnable = useCallback(
    async (data: PasswordPayload) => {
      const response = await enable.mutateAsync(data);

      setUri(response.totpURI);
      setCodes(response.backupCodes);
      setTwoFactorOpen(false);
      setTotpOpen(true);
    },
    [enable, setUri, setCodes, setTwoFactorOpen, setTotpOpen],
  );

  const onDisable = useCallback(
    async (data: PasswordPayload) => {
      await disable.mutateAsync(data);
    },
    [disable],
  );

  return (
    <Card className="h-fit w-full overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-4">
        <div className="space-y-1.5">
          <CardTitle className="text-xl">
            {t("account.twoFactor.title")}
          </CardTitle>
          <CardDescription className="flex flex-col gap-1 pb-1.5 text-foreground">
            {t("account.twoFactor.description")}
          </CardDescription>
        </div>

        <TwoFactorSwitch
          onSubmit={enabled ? onDisable : onEnable}
          open={twoFactorOpen}
          onOpenChange={setTwoFactorOpen}
        />
        <TotpModal open={totpOpen} onOpenChange={setTotpOpen} />
      </CardHeader>

      <CardContent className="space-y-4">
        <TotpTile />
        <BackupCodesTile />
      </CardContent>
      <CardFooter className="min-h-14 border-t bg-muted/75 py-3 text-sm text-muted-foreground dark:bg-card">
        <span>{t("account.twoFactor.info")}</span>
      </CardFooter>
    </Card>
  );
};

const TwoFactorSwitch = ({
  open,
  onOpenChange,
  onSubmit,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (data: PasswordPayload) => Promise<void>;
}) => {
  const { t } = useTranslation(["common", "auth"]);

  const { enabled } = useTwoFactor();

  const key = useMemo(() => {
    return enabled ? "disable" : "enable";
  }, [enabled]);

  return (
    <RequirePassword
      onConfirm={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
      title={t(`account.twoFactor.${key}.title`)}
      description={t(`account.twoFactor.${key}.description`)}
      cta={t(key)}
    >
      <Switch
        checked={enabled}
        className={cn({
          "bg-input": !enabled,
          "bg-primary": enabled,
        })}
      />
    </RequirePassword>
  );
};
