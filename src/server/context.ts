import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { nextAuthOptions } from "common/auth";
import prisma from "common/prisma";
import { unstable_getServerSession } from "next-auth";

export async function createContext(ctx: CreateNextContextOptions) {
  const { req, res } = ctx;
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    nextAuthOptions
  );

  return {
    req,
    res,
    session,
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
