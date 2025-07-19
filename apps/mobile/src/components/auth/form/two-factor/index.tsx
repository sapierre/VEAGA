import { SecondFactor } from "@turbostarter/auth";

import { BackupCodeForm, BackupCodeCta } from "./backup-code";
import { TotpForm, TotpCta } from "./totp";

export interface CtaProps {
  readonly onFactorChange: (factor: SecondFactor) => void;
}

const TwoFactorForm: Record<SecondFactor, (props: unknown) => React.ReactNode> =
  {
    [SecondFactor.TOTP]: TotpForm,
    [SecondFactor.BACKUP_CODE]: BackupCodeForm,
  };

const TwoFactorCta: Record<SecondFactor, (props: CtaProps) => React.ReactNode> =
  {
    [SecondFactor.TOTP]: TotpCta,
    [SecondFactor.BACKUP_CODE]: BackupCodeCta,
  };

export const TwoFactor = {
  Form: TwoFactorForm,
  Cta: TwoFactorCta,
};
