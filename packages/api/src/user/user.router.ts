import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure.query(() => ({
    greeting: "Hello, world!",
  })),
});
