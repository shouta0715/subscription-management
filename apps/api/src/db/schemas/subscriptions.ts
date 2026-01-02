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
import { paymentMethod } from "./payment-methods";
import { subscriptionTagAssignment } from "./subscription-tags";
import { user } from "./users";

export const subscription = sqliteTable(
  "subscription",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    paymentMethodId: text("payment_method_id")
      .notNull()
      .references(() => paymentMethod.id, { onDelete: "cascade" }),
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
    index("subscription_user_id_idx").on(table.userId),
    index("subscription_status_idx").on(table.status),
    index("subscription_billing_idx").on(
      table.paymentMethodId,
      table.billingStartDate,
      table.billingEndDate,
    ),
    check("subscription_amount_minor_check", sql`${table.amountMinor} >= 0`),
  ],
);

export const subscriptionRelations = relations(
  subscription,
  ({ one, many }) => ({
    user: one(user, {
      fields: [subscription.userId],
      references: [user.id],
    }),
    paymentMethod: one(paymentMethod, {
      fields: [subscription.paymentMethodId],
      references: [paymentMethod.id],
    }),
    tagAssignments: many(subscriptionTagAssignment),
  }),
);
