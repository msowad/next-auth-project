import { nextAuthOptions } from "common/auth";
import { GetServerSidePropsContext } from "next";
import { Session, unstable_getServerSession } from "next-auth";

type CallbackType = {
  (ctx: GetServerSidePropsContext, session: Session): void;
};

export const requireAuth =
  (func: CallbackType) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: nextAuthOptions.pages?.signIn,
          permanent: false,
        },
      };
    }

    return await func(ctx, session);
  };
