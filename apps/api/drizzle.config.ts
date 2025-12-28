import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

void config({ path: ".dev.vars" });

const { DB_URL, DB_AUTH_TOKEN } = process.env;

if (!DB_URL || !DB_AUTH_TOKEN) {
  throw new Error("DB_URL and DB_AUTH_TOKEN are required");
}

export default defineConfig({
  out: "./src/drizzle",
  schema: "./src/db/schemas",
  dialect: "turso",
  dbCredentials: {
    url: DB_URL,
    // TODO: Add authToken for production
    // authToken: DB_AUTH_TOKEN,
  },
});
