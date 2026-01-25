import { parseToArraySchema } from "@package/lib/parser";
import {
  PaymentMethod,
  paymentMethodSchema,
} from "@package/model/payment-methods";
import { env } from "@/env/client";
import { authFetch } from "@/lib/auth-fetch";

const PAYMENT_METHODS_API_URL = `${env.EXPO_PUBLIC_API_URL}/payment-methods`;

export async function queryPaymentMethodsHandler(): Promise<PaymentMethod[]> {
  const response = await authFetch(PAYMENT_METHODS_API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch payment methods: ${response.status}`);
  }

  const data = await response.json();

  return parseToArraySchema(paymentMethodSchema, data);
}
