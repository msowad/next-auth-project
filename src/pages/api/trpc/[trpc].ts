import { createNextApiHandler } from "@trpc/server/adapters/next";
import { createContext } from "server/context";
import { serverRouter } from "server/router";

export default createNextApiHandler({
  router: serverRouter,
  createContext,
});
