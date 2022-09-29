import { verify } from "argon2";
import prisma from "common/prisma";
import { loginScheme } from "common/validation/auth";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        const { email, password } = await loginScheme.parseAsync(credentials);

        const user = await prisma.user.findFirst({
          where: { email },
        });
        if (!user) {
          return null;
        }

        const isValidPassword = await verify(user.password, password);
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60,
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};
