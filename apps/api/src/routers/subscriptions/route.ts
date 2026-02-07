import { parseToArraySchema } from "@package/lib/parser";
import { Subscription, subscriptionSchema } from "@package/model";
import { asc, eq } from "drizzle-orm";
import { subscription } from "@/db/schemas";
import { factory } from "@/helpers/factory";

const app = factory.createApp();

app.get("/", async (c) => {
  const userId = c.var.user.id;
  const subscriptions = await c.var.db
    .select()
    .from(subscription)
    .where(eq(subscription.userId, userId))
    .orderBy(asc(subscription.id));

  const parsedSubscriptions = parseToArraySchema(
    subscriptionSchema,
    subscriptions,
  );

  return c.json<Subscription[]>(parsedSubscriptions);
});

export { app as subscriptionsRouter };
