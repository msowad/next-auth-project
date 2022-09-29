import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";
import { ServerRouter } from "server/router";
import "styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default withTRPC<ServerRouter>({
  config({ ctx }) {
    if (typeof window !== "undefined") {
      // during client requests
      return {
        url: "/api/trpc",
      };
    }

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : `https://localhost:3000/api/trpc`;

    return {
      url,
      headers: {
        "x-ssr": "1",
      },
    };
  },
  ssr: true,
})(MyApp);
