import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuthOptions } from "./options";
import { drizzleDatabase } from "@/helpers/drizzle";

export const auth = (
  env: CloudflareBindings,
): ReturnType<typeof betterAuth> => {
  const db = drizzleDatabase({
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  });

  return betterAuth({
    ...betterAuthOptions(env),
    database: drizzleAdapter(db, { provider: "sqlite" }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
  });
};
