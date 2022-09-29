import { nextAuthOptions } from "common/auth";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

export const guestRoute =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions
    );

    if (session) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: true,
        },
      };
    }

    return await func(ctx);
  };
