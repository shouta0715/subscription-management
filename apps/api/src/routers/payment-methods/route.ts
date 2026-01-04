import { parseSchema } from "@package/lib/parser";
import { PaymentMethod, paymentMethodSchema } from "@package/model";
import { eq } from "drizzle-orm";
import { paymentMethod } from "@/db/schemas";
import { factory } from "@/helpers/factory";

const app = factory.createApp();

app.get("/", async (c) => {
  const userId = c.var.user.id;
  const paymentMethods = await c.var.db
    .select()
    .from(paymentMethod)
    .where(eq(paymentMethod.userId, userId));

  return c.json<PaymentMethod[]>(
    paymentMethods.map((pm) => parseSchema(paymentMethodSchema, pm)),
  );
});

export { app as paymentMethodsRouter };
