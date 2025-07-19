import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email(),
});

const password = z.string().min(8);
const passwordSchema = z.object({
  password,
});

const otpSchema = z.object({
  code: z.string().min(6).max(6),
});

const backupCodeSchema = z.object({
  code: z.string().min(11).max(11),
});

const trustDeviceSchema = z.object({
  trustDevice: z.boolean().optional(),
});

const updateUserSchema = z.object({
  name: z.string().min(2).max(32).optional(),
  image: z.string().url().optional(),
});

const changePasswordSchema = passwordSchema.merge(
  z.object({
    newPassword: password,
  }),
);

const registerSchema = emailSchema.merge(passwordSchema);
const passwordLoginSchema = emailSchema.merge(passwordSchema).merge(
  z.object({
    rememberMe: z.boolean().optional().default(true),
  }),
);
const magicLinkLoginSchema = emailSchema;
const forgotPasswordSchema = emailSchema;
const updatePasswordSchema = passwordSchema;

const otpVerificationSchema = otpSchema.merge(trustDeviceSchema);
const backupCodeVerificationSchema = backupCodeSchema.merge(trustDeviceSchema);

type EmailPayload = z.infer<typeof emailSchema>;
type PasswordLoginPayload = z.infer<typeof passwordLoginSchema>;
type MagicLinkLoginPayload = z.infer<typeof magicLinkLoginSchema>;
type RegisterPayload = z.infer<typeof registerSchema>;
type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
type UpdatePasswordPayload = z.infer<typeof updatePasswordSchema>;
type PasswordPayload = z.infer<typeof passwordSchema>;
type UpdateUserPayload = z.infer<typeof updateUserSchema>;
type ChangePasswordPayload = z.infer<typeof changePasswordSchema>;
type OtpPayload = z.infer<typeof otpSchema>;
type OtpVerificationPayload = z.infer<typeof otpVerificationSchema>;
type BackupCodePayload = z.infer<typeof backupCodeSchema>;
type BackupCodeVerificationPayload = z.infer<
  typeof backupCodeVerificationSchema
>;

export {
  passwordSchema,
  registerSchema,
  passwordLoginSchema,
  magicLinkLoginSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
  updateUserSchema,
  emailSchema,
  changePasswordSchema,
  otpSchema,
  otpVerificationSchema,
  backupCodeSchema,
  backupCodeVerificationSchema,
};

export type {
  PasswordLoginPayload,
  MagicLinkLoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
  UpdatePasswordPayload,
  PasswordPayload,
  UpdateUserPayload,
  EmailPayload,
  ChangePasswordPayload,
  OtpPayload,
  OtpVerificationPayload,
  BackupCodePayload,
  BackupCodeVerificationPayload,
};
