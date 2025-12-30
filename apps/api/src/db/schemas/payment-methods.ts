import { paymentMethodTypes } from "@package/model/payment-methods";
import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  index,
  check,
} from "drizzle-orm/sqlite-core";

import { card } from "./cards";
import { subscription } from "./subscriptions";
import { user } from "./users";

export const paymentMethod = sqliteTable(
  "payment_method",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type", { enum: paymentMethodTypes }).notNull(),
    label: text("label").notNull(),
    cardId: text("card_id").references(() => card.id, { onDelete: "restrict" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("paymentMethod_userId_idx").on(table.userId),
    index("paymentMethod_cardId_idx").on(table.cardId),
    // type = 'card' の場合は card_id 必須
    check(
      "paymentMethod_card_requires_cardId",
      sql`${table.type} != 'card' OR ${table.cardId} IS NOT NULL`,
    ),
  ],
);

export const paymentMethodRelations = relations(
  paymentMethod,
  ({ one, many }) => ({
    user: one(user, {
      fields: [paymentMethod.userId],
      references: [user.id],
    }),
    card: one(card, {
      fields: [paymentMethod.cardId],
      references: [card.id],
    }),
    subscriptions: many(subscription),
  }),
);
