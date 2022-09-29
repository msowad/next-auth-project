import * as z from "zod";

export const loginScheme = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(12),
});

export const registerScheme = loginScheme.extend({
  username: z.string(),
});

export type ILogin = z.infer<typeof loginScheme>;
export type IRegister = z.infer<typeof registerScheme>;
