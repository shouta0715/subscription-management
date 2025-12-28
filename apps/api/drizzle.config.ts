import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

void config({ path: ".dev.vars" });

const { DB_URL, DB_AUTH_TOKEN } = process.env;

if (!DB_URL || !DB_AUTH_TOKEN) {
  throw new Error("Invalid environment variables");
}

export default defineConfig({
  out: "./src/drizzle",
  schema: "./src/db/schemas",
  dialect: "turso",
  dbCredentials: {
    url: DB_URL,
    authToken: DB_AUTH_TOKEN,
  },
});
