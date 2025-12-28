import { drizzle } from "drizzle-orm/libsql";
import { createFactory } from "hono/factory";
import * as schemas from "@/db/schemas";
import { AppEnv } from "@/types/app-env";

export const factory = createFactory<AppEnv>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const db = drizzle({
        connection: { url: c.env.DB_URL, authToken: c.env.DB_AUTH_TOKEN },
        schema: schemas,
      });
      c.set("db", db);
      await next();
    });
  },
});
