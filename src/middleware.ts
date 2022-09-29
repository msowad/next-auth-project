import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (token !== null) {
        return true;
      }
      return false;
    },
  },
});

export const config = { matcher: ["/dashboard"] };
