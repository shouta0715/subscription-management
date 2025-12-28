import { createFactory } from "hono/factory";
import { drizzleDatabase } from "./drizzle";
import { AppEnv } from "@/types/app-env";

export const factory = createFactory<AppEnv>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const db = drizzleDatabase({
        url: c.env.DB_URL,
        authToken: c.env.DB_AUTH_TOKEN,
      });
      c.set("db", db);
      await next();
    });
  },
});
