import { LibSQLDatabase, drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import * as schemas from "@/db/schemas";

type Params = {
  url: string;
  authToken: string;
};

export const drizzleDatabase = ({
  url,
  authToken,
}: Params): LibSQLDatabase<typeof schemas> =>
  drizzleLibsql({
    connection: { url, authToken },
    schema: schemas,
  });
