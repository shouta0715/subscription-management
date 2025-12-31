import * as v from "valibot";

import { cardIdSchema } from "../cards/id";
import { timestampSchema } from "../common";
import { userIdSchema } from "../users/id";
import { paymentMethodIdSchema } from "./id";
import { PaymentMethodType } from "./type";

const commonPaymentMethodSchema = v.object({
  id: paymentMethodIdSchema,
  userId: userIdSchema,
  label: v.pipe(v.string(), v.minLength(1)),
  cardId: v.nullable(cardIdSchema),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export const cardPaymentMethodSchema = v.object({
  ...commonPaymentMethodSchema.entries,
  type: v.literal("card" satisfies PaymentMethodType),
  cardId: cardIdSchema,
});

export const applePaymentMethodSchema = v.object({
  ...commonPaymentMethodSchema.entries,
  type: v.literal("apple" satisfies PaymentMethodType),
});

export const googlePaymentMethodSchema = v.object({
  ...commonPaymentMethodSchema.entries,
  type: v.literal("google" satisfies PaymentMethodType),
});

export const otherPaymentMethodSchema = v.object({
  ...commonPaymentMethodSchema.entries,
  type: v.literal("other" satisfies PaymentMethodType),
});

export const paymentMethodSchema = v.variant("type", [
  cardPaymentMethodSchema,
  applePaymentMethodSchema,
  googlePaymentMethodSchema,
  otherPaymentMethodSchema,
]);

export type PaymentMethod = v.InferOutput<typeof paymentMethodSchema>;
export type CardPaymentMethod = v.InferOutput<typeof cardPaymentMethodSchema>;
export type ApplePaymentMethod = v.InferOutput<typeof applePaymentMethodSchema>;
export type GooglePaymentMethod = v.InferOutput<
  typeof googlePaymentMethodSchema
>;
export type OtherPaymentMethod = v.InferOutput<typeof otherPaymentMethodSchema>;

export const paymentMethodIsCard = (
  paymentMethod: PaymentMethod,
): paymentMethod is CardPaymentMethod => paymentMethod.type === "card";
