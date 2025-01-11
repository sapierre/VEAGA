import { z } from "zod";

export const MAX_MESSAGE_LENGTH = 4000;

export const contactFormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please enter a valid email address"),
  message: z
    .string({
      required_error: "Message is required",
    })
    .min(10, "Message must be at least 10 characters")
    .max(
      MAX_MESSAGE_LENGTH,
      `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`,
    ),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
