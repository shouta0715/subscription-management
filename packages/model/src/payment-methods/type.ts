import * as v from "valibot";

export const paymentMethodTypeSchema = v.picklist([
  "card",
  "apple",
  "google",
  "other",
]);

export const paymentMethodTypes = paymentMethodTypeSchema.options;

export type PaymentMethodType = v.InferOutput<typeof paymentMethodTypeSchema>;
