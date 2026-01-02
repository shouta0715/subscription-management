import type { ResultSet } from "@libsql/client";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { LibSQLDatabase } from "drizzle-orm/libsql";
import type { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import type * as schemas from "@/db/schemas";

type SeedDB = LibSQLDatabase<typeof schemas>;

type SeedTX = SQLiteTransaction<
  "async",
  ResultSet,
  typeof schemas,
  ExtractTablesWithRelations<typeof schemas>
>;

export type SeedDBOrTX = SeedDB | SeedTX;
