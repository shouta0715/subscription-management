import { User } from "@package/model";
import { DB } from "./db";

type Variables = {
  db: DB;
  user: User;
};

type Bindings = Cloudflare.Env;

export type AppEnv = {
  Variables: Variables;
  Bindings: Bindings;
};
