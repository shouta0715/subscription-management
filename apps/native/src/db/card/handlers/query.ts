import { parseToArraySchema } from "@package/lib/parser";
import { Card, cardSchema } from "@package/model/cards";
import { env } from "@/env/client";
import { authFetch } from "@/lib/auth-fetch";

const CARDS_API_URL = `${env.EXPO_PUBLIC_API_URL}/cards`;

export async function queryCardsHandler(): Promise<Card[]> {
  const response = await authFetch(CARDS_API_URL);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!response.ok) {
    throw new Error(`Failed to fetch cards: ${response.status}`);
  }

  const data = await response.json();

  return parseToArraySchema(cardSchema, data);
}
