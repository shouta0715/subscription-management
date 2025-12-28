import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { parseEnv } from "@/helpers/env";

void config({ path: ".dev.vars" });

const env = parseEnv(process.env);

export default defineConfig({
  out: "./src/drizzle",
  schema: "./src/db/schemas",
  dialect: "turso",
  dbCredentials: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
});
