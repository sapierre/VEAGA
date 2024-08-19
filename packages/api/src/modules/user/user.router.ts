import { updateUserSchema } from "@turbostarter/shared/validators";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";

import { userControllerFactory } from "./user.controller";

export const userRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  update: protectedProcedure
    .input(updateUserSchema)
    .mutation(({ ctx, input }) =>
      userControllerFactory({ auth: ctx.auth }).updateUser(input),
    ),
});
