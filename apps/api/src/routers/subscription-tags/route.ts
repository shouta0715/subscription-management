import { parseSchema } from "@package/lib/parser";
import {
  SubscriptionTag,
  SubscriptionTagAssignment,
  subscriptionTagAssignmentSchema,
  subscriptionTagSchema,
} from "@package/model";
import { eq } from "drizzle-orm";
import { subscriptionTag, subscriptionTagAssignment } from "@/db/schemas";
import { factory } from "@/helpers/factory";

const app = factory.createApp();

app.get("/", async (c) => {
  const userId = c.var.user.id;
  const tags = await c.var.db
    .select()
    .from(subscriptionTag)
    .where(eq(subscriptionTag.userId, userId));

  return c.json<SubscriptionTag[]>(
    tags.map((tag) => parseSchema(subscriptionTagSchema, tag)),
  );
});

app.get("/assignments", async (c) => {
  const userId = c.var.user.id;
  const assignments = await c.var.db
    .select()
    .from(subscriptionTagAssignment)
    .where(eq(subscriptionTagAssignment.userId, userId));

  return c.json<SubscriptionTagAssignment[]>(
    assignments.map((a) => parseSchema(subscriptionTagAssignmentSchema, a)),
  );
});

export { app as subscriptionTagsRouter };
