import * as v from "valibot";
import { AppEnv } from "@/types/app-env";

const envSchema = v.object({
  DB_URL: v.pipe(v.string(), v.url()),
  DB_AUTH_TOKEN: v.string(),
  BETTER_AUTH_URL: v.pipe(v.string(), v.url()),
  BETTER_AUTH_SECRET: v.string(),
  CLIENT_URL: v.pipe(v.string(), v.url()),
  ENV: v.picklist(["development", "production"]),
  GOOGLE_CLIENT_ID: v.string(),
  GOOGLE_CLIENT_SECRET: v.string(),
  APPLE_CLIENT_ID: v.string(),
  APPLE_CLIENT_SECRET: v.string(),
});

export const parseEnv = (env: unknown): AppEnv["Bindings"] =>
  v.parse(envSchema, env);
