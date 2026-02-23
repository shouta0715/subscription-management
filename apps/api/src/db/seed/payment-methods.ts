/* eslint-disable no-console */
import { parseSchema } from "@package/lib/parser";
import { userIdSchema } from "@package/model";
import { type Card } from "@package/model/cards";
import {
  CardPaymentMethod,
  cardPaymentMethodSchema,
  paymentMethodIdSchema,
  paymentMethodSchema,
  paymentMethodTypes,
  type PaymentMethod,
} from "@package/model/payment-methods";
import { User } from "better-auth";
import type { SeedDBOrTX } from "./types";
import { paymentMethod } from "@/db/schemas/payment-methods";

const otherTypes = paymentMethodTypes.filter((type) => type !== "card");

const generatePaymentMethods = (user: User, cards: Card[]): PaymentMethod[] => {
  const now = new Date();

  const userId = parseSchema(userIdSchema, user.id);
  const userCards = cards.filter((card) => card.userId === userId);

  const cardMethods = userCards.map((card, cardIndex) =>
    parseSchema(cardPaymentMethodSchema, {
      id: parseSchema(paymentMethodIdSchema, crypto.randomUUID()),
      userId,
      type: "card",
      label: `カード支払い${cardIndex + 1}`,
      cardId: card.id,
      order: cardIndex,
      createdAt: now,
      updatedAt: now,
    } satisfies CardPaymentMethod),
  );

  const addOtherCount = Math.floor(Math.random() * 2);
  const otherMethods = Array.from({ length: addOtherCount }, (_, i) =>
    parseSchema(paymentMethodSchema, {
      id: parseSchema(paymentMethodIdSchema, crypto.randomUUID()),
      userId,
      type: otherTypes[i % otherTypes.length] ?? "other",
      label: `${otherTypes[i % otherTypes.length] ?? "other"}支払い`,
      cardId: null,
      order: cardMethods.length + i,
      createdAt: now,
      updatedAt: now,
    } satisfies PaymentMethod),
  );

  return [...cardMethods, ...otherMethods];
};

export const seedPaymentMethods = async (
  db: SeedDBOrTX,
  user: User,
  cards: Card[],
): Promise<PaymentMethod[]> => {
  console.log("🌱 Seeding payment methods...");

  const paymentMethods = generatePaymentMethods(user, cards);

  await db.insert(paymentMethod).values(paymentMethods);

  console.log(`✅ Created ${paymentMethods.length} payment methods`);

  return paymentMethods;
};
