import { nextAuthOptions } from "common/auth";
import { GetServerSidePropsContext } from "next";
import { Session, unstable_getServerSession } from "next-auth";

export type WithSessionType = Session | null;

type CallbackType = {
  (ctx: GetServerSidePropsContext, session: WithSessionType): void;
};

export const withSession =
  (func: CallbackType) => async (context: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      nextAuthOptions
    );

    return func(context, session);
  };
