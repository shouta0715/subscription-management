import { parseSchema } from "@package/lib/parser";
import { Card, cardSchema } from "@package/model";
import { eq } from "drizzle-orm";
import { card } from "@/db/schemas";
import { factory } from "@/helpers/factory";

const app = factory.createApp();

app.get("/", async (c) => {
  const userId = c.var.user.id;
  const cards = await c.var.db
    .select()
    .from(card)
    .where(eq(card.userId, userId));

  return c.json<Card[]>(cards.map((c) => parseSchema(cardSchema, c)));
});

export { app as cardsRouter };
