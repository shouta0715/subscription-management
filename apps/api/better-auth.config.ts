import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { config } from "dotenv";
import * as schemas from "@/db/schemas";
import { drizzleDatabase } from "@/helpers/drizzle";
import { parseEnv } from "@/helpers/env";
import { betterAuthOptions } from "@/lib/auth/options";

void config({ path: ".dev.vars" });

const env = parseEnv(process.env);

const db = drizzleDatabase({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
});

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  ...betterAuthOptions(env),
  database: drizzleAdapter(db, { provider: "sqlite", schema: schemas }),
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
});
