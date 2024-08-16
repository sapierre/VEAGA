import { z } from "zod";

import { PASSWORD_REGEX } from "../auth";

const updateUserSchema = z.object({
  password: z.string().regex(PASSWORD_REGEX).optional(),
});

type UpdateUserData = z.infer<typeof updateUserSchema>;

export { updateUserSchema };

export type { UpdateUserData };
