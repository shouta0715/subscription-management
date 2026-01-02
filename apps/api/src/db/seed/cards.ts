/* eslint-disable no-console */
import { parseSchema } from "@package/lib/parser";
import { userIdSchema } from "@package/model";
import {
  cardBrands,
  cardIdSchema,
  cardSchema,
  type Card,
} from "@package/model/cards";
import { User } from "better-auth";
import type { SeedDBOrTX } from "./types";
import { card } from "@/db/schemas/cards";

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pickRandom = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)] as T;

const generateCards = (users: User[]): Card[] => {
  const now = new Date();

  return users
    .map((user, userIndex) => {
      const cardCount = randomInt(0, 5);
      const userId = parseSchema(userIdSchema, user.id);

      return Array.from({ length: cardCount }, (_, i) =>
        parseSchema(cardSchema, {
          id: parseSchema(cardIdSchema, crypto.randomUUID()),
          userId,
          name: `カード${userIndex + 1}-${i + 1}`,
          image: null,
          brand: pickRandom(cardBrands),
          closingDay: randomInt(1, 28),
          paymentDay: randomInt(1, 28),
          createdAt: now,
          updatedAt: now,
        } satisfies Card),
      );
    })
    .flat();
};

export const seedCards = async (
  db: SeedDBOrTX,
  users: User[],
): Promise<Card[]> => {
  console.log("🌱 Seeding cards...");

  const cardsData = generateCards(users);

  if (cardsData.length > 0) {
    await db.insert(card).values(cardsData);
  }

  console.log(`✅ Created ${cardsData.length} cards`);

  return cardsData;
};
