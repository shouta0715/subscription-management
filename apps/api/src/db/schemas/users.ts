import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Sample schema for development
export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});
