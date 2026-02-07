import { parseToArraySchema } from "@package/lib/parser";
import { Subscription, subscriptionSchema } from "@package/model/subscriptions";
import { env } from "@/env/client";
import { authFetch } from "@/lib/auth-fetch";

const SUBSCRIPTIONS_API_URL = `${env.EXPO_PUBLIC_API_URL}/subscriptions`;

export async function querySubscriptionsHandler(): Promise<Subscription[]> {
  const response = await authFetch(SUBSCRIPTIONS_API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch subscriptions: ${response.status}`);
  }

  const data = await response.json();

  return parseToArraySchema(subscriptionSchema, data);
}
