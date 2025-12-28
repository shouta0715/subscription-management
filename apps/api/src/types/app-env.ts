import { LibSQLDatabase } from "drizzle-orm/libsql";
import * as schemas from "@/db/schemas";

type Variables = {
  db: LibSQLDatabase<typeof schemas>;
};

type Bindings = Cloudflare.Env;

export type AppEnv = {
  Variables: Variables;
  Bindings: Bindings;
};
