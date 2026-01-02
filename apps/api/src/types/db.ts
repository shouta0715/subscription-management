import { LibSQLDatabase } from "drizzle-orm/libsql";
import * as schemas from "@/db/schemas";

export type DB = LibSQLDatabase<typeof schemas>;
