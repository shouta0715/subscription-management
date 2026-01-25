import { parseToArraySchema } from "@package/lib/parser";
import { PaymentMethod, paymentMethodSchema } from "@package/model";
import { asc, eq } from "drizzle-orm";
import { paymentMethod } from "@/db/schemas";
import { factory } from "@/helpers/factory";

const app = factory.createApp();

app.get("/", async (c) => {
  const userId = c.var.user.id;
  const paymentMethods = await c.var.db
    .select()
    .from(paymentMethod)
    .where(eq(paymentMethod.userId, userId))
    .orderBy(asc(paymentMethod.id));

  const parsedPaymentMethods = parseToArraySchema(
    paymentMethodSchema,
    paymentMethods,
  );

  return c.json<PaymentMethod[]>(parsedPaymentMethods);
});

export { app as paymentMethodsRouter };
