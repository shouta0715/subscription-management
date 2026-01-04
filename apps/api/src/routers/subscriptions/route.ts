import { parseSchema } from "@package/lib/parser";
import { Subscription, subscriptionSchema } from "@package/model";
import { eq } from "drizzle-orm";
import { subscription } from "@/db/schemas";
import { factory } from "@/helpers/factory";

const app = factory.createApp();

app.get("/", async (c) => {
  const userId = c.var.user.id;
  const subscriptions = await c.var.db
    .select()
    .from(subscription)
    .where(eq(subscription.userId, userId));

  return c.json<Subscription[]>(
    subscriptions.map((sub) => parseSchema(subscriptionSchema, sub)),
  );
});

export { app as subscriptionsRouter };
