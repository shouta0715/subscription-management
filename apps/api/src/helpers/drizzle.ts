import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import * as schemas from "@/db/schemas";
import { DB } from "@/types/db";

type Params = {
  url: string;
  authToken: string;
};

export const drizzleDatabase = ({ url, authToken }: Params): DB =>
  drizzleLibsql({
    connection: { url, authToken },
    schema: schemas,
  });
