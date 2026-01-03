import { parseSchema } from "@package/lib/parser";
import { SubscriptionTag, subscriptionTagSchema } from "@package/model";
import { eq } from "drizzle-orm";
import { subscriptionTag } from "@/db/schemas";
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

export { app as subscriptionTagsRouter };
