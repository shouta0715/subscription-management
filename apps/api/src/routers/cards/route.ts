import { parseToArraySchema } from "@package/lib/parser";
import { Card, cardSchema } from "@package/model";
import { asc, eq } from "drizzle-orm";
import { card } from "@/db/schemas";
import { factory } from "@/helpers/factory";

const app = factory.createApp();

app.get("/", async (c) => {
  const userId = c.var.user.id;
  const cards = await c.var.db
    .select()
    .from(card)
    .where(eq(card.userId, userId))
    .orderBy(asc(card.id));

  const parsedCards = parseToArraySchema(cardSchema, cards);

  return c.json<Card[]>(parsedCards);
});

export { app as cardsRouter };
