import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure.query(() => ({
    greeting: "Hello, world!",
  })),
  secret: protectedProcedure.query(() => ({
    secret: "This is a secret message.",
  })),
});
