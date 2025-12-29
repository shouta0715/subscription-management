import {
  subscriptionBillingUnits,
  subscriptionCurrencies,
  subscriptionStatuses,
} from "@package/model/subscriptions";
import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  index,
  check,
} from "drizzle-orm/sqlite-core";
import { card } from "./cards";
import { user } from "./users";

export const subscription = sqliteTable(
  "subscription",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    cardId: text("card_id")
      .notNull()
      .references(() => card.id, { onDelete: "restrict" }),
    name: text("name").notNull(),
    amountMinor: integer("amount_minor").notNull(),
    currency: text("currency", { enum: subscriptionCurrencies }).notNull(),
    billingUnit: text("billing_unit", {
      enum: subscriptionBillingUnits,
    }).notNull(),
    billingStartDate: text("billing_start_date").notNull(),
    billingEndDate: text("billing_end_date"),
    canceledDate: text("canceled_date"),
    status: text("status", { enum: subscriptionStatuses }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("subscription_userId_idx").on(table.userId),
    index("subscription_cardId_idx").on(table.cardId),
    index("subscription_status_idx").on(table.status),
    index("subscription_card_billing_idx").on(
      table.cardId,
      table.billingStartDate,
      table.billingEndDate,
    ),
    check("subscription_amountMinor_check", sql`${table.amountMinor} >= 0`),
  ],
);

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  user: one(user, {
    fields: [subscription.userId],
    references: [user.id],
  }),
  card: one(card, {
    fields: [subscription.cardId],
    references: [card.id],
  }),
}));
