import { z } from "zod";

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

const emailSchema = z.object({
  email: z
    .string({ required_error: "This field is required." })
    .email("Email must be a valid email."),
});

const password = z
  .string({ required_error: "This field is required." })
  .regex(
    PASSWORD_REGEX,
    "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
  );

const passwordSchema = z.object({
  password,
});

const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .max(32, "Name must be at most 32 characters long.")
    .optional(),
  image: z.string().url("Image must be a valid URL.").optional(),
});

const changePasswordSchema = passwordSchema.merge(
  z.object({
    newPassword: password,
  }),
);

const registerSchema = emailSchema.merge(passwordSchema);
const passwordLoginSchema = emailSchema.merge(passwordSchema);
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
