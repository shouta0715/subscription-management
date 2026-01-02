import { subscriptionTagColorTokens } from "@package/model/subscription-tags";
import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/sqlite-core";

import { subscription } from "./subscriptions";
import { user } from "./users";

export const subscriptionTag = sqliteTable(
  "subscription_tag",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    label: text("label").notNull(),
    colorToken: text("color_token", {
      enum: subscriptionTagColorTokens,
    }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("subscription_tag_userId_idx").on(table.userId),
    uniqueIndex("subscription_tag_userId_label_idx").on(
      table.userId,
      table.label,
    ),
  ],
);

export const subscriptionTagAssignment = sqliteTable(
  "subscription_tag_assignment",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    subscriptionId: text("subscription_id")
      .notNull()
      .references(() => subscription.id, { onDelete: "cascade" }),
    subscriptionTagId: text("subscription_tag_id")
      .notNull()
      .references(() => subscriptionTag.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.subscriptionId, table.subscriptionTagId],
    }),
    index("subscription_tag_assignment_userId_tagId_idx").on(
      table.userId,
      table.subscriptionTagId,
    ),
  ],
);

export const subscriptionTagRelations = relations(
  subscriptionTag,
  ({ one, many }) => ({
    user: one(user, {
      fields: [subscriptionTag.userId],
      references: [user.id],
    }),
    assignments: many(subscriptionTagAssignment),
  }),
);

export const subscriptionTagAssignmentRelations = relations(
  subscriptionTagAssignment,
  ({ one }) => ({
    user: one(user, {
      fields: [subscriptionTagAssignment.userId],
      references: [user.id],
    }),
    subscription: one(subscription, {
      fields: [subscriptionTagAssignment.subscriptionId],
      references: [subscription.id],
    }),
    tag: one(subscriptionTag, {
      fields: [subscriptionTagAssignment.subscriptionTagId],
      references: [subscriptionTag.id],
    }),
  }),
);
