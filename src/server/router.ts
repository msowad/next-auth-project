import { router, TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { registerScheme } from "common/validation/auth";
import { Context } from "./context";

export const serverRouter = router<Context>().mutation("register", {
  input: registerScheme,
  resolve: async ({ input, ctx }) => {
    const { username, email, password } = input;

    const exists = await ctx.prisma.user.findFirst({ where: { email } });

    if (exists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const hashedPassword = await hash(password);
    const result = await ctx.prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    return {
      status: 201,
      message: "Account created successfully",
      result: result.email,
    };
  },
});

export type ServerRouter = typeof serverRouter;
