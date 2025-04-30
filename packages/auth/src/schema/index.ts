import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email(),
});

const password = z.string().min(8);
const passwordSchema = z.object({
  password,
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

type EmailPayload = z.infer<typeof emailSchema>;
type PasswordLoginPayload = z.infer<typeof passwordLoginSchema>;
type MagicLinkLoginPayload = z.infer<typeof magicLinkLoginSchema>;
type RegisterPayload = z.infer<typeof registerSchema>;
type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
type UpdatePasswordPayload = z.infer<typeof updatePasswordSchema>;
type PasswordPayload = z.infer<typeof passwordSchema>;
type UpdateUserPayload = z.infer<typeof updateUserSchema>;
type ChangePasswordPayload = z.infer<typeof changePasswordSchema>;

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
};
