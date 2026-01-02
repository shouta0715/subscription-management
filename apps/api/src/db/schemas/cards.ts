import { cardBrands } from "@package/model/cards";
import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  index,
  check,
} from "drizzle-orm/sqlite-core";

import { paymentMethod } from "./payment-methods";
import { user } from "./users";

export const card = sqliteTable(
  "card",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    image: text("image"),
    brand: text("brand", { enum: cardBrands }).notNull(),
    closingDay: integer("closing_day").notNull(),
    paymentDay: integer("payment_day").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("card_user_id_idx").on(table.userId),
    check(
      "card_closing_day_check",
      sql`${table.closingDay} >= 1 AND ${table.closingDay} <= 31`,
    ),
    check(
      "card_payment_day_check",
      sql`${table.paymentDay} >= 1 AND ${table.paymentDay} <= 31`,
    ),
  ],
);

export const cardRelations = relations(card, ({ one, many }) => ({
  user: one(user, {
    fields: [card.userId],
    references: [user.id],
  }),
  paymentMethods: many(paymentMethod),
}));
