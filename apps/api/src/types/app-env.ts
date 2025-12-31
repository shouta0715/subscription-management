import { Session, User } from "better-auth";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import * as schemas from "@/db/schemas";

type Variables = {
  db: LibSQLDatabase<typeof schemas>;
  user: User;
  session: Session;
};

type Bindings = Cloudflare.Env;

export type AppEnv = {
  Variables: Variables;
  Bindings: Bindings;
};
