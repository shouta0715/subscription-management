import * as v from "valibot";

import { yyyymmddSchema, timestampSchema } from "../common";
import { paymentMethodIdSchema } from "../payment-methods/id";
import { userIdSchema } from "../users/id";
import { subscriptionBillingUnitSchema } from "./billing-unit";
import { isValidSubscriptionData } from "./check";
import { subscriptionCurrencySchema } from "./currency";
import { subscriptionIdSchema } from "./id";
import { SubscriptionStatus } from "./status";

export const amountMinorSchema = v.pipe(v.number(), v.integer(), v.minValue(0));

const baseSubscriptionSchema = v.object({
  id: subscriptionIdSchema,
  userId: userIdSchema,
  paymentMethodId: paymentMethodIdSchema,
  name: v.pipe(v.string(), v.minLength(1)),
  amountMinor: amountMinorSchema,
  currency: subscriptionCurrencySchema,
  billingUnit: subscriptionBillingUnitSchema,
  billingStartDate: yyyymmddSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export const activeSubscriptionSchema = v.object({
  ...baseSubscriptionSchema.entries,
  status: v.literal("active" satisfies SubscriptionStatus),
  billingEndDate: v.null(),
  canceledDate: v.null(),
});

export const canceledSubscriptionSchema = v.pipe(
  v.object({
    ...baseSubscriptionSchema.entries,
    status: v.literal("canceled" satisfies SubscriptionStatus),
    canceledDate: yyyymmddSchema,
    billingEndDate: yyyymmddSchema,
  }),
  v.check(({ billingStartDate, billingEndDate, canceledDate }) =>
    isValidSubscriptionData({
      billingStartDate,
      billingEndDate,
      canceledDate,
    }),
  ),
);

export const subscriptionSchema = v.variant("status", [
  activeSubscriptionSchema,
  canceledSubscriptionSchema,
]);

export type AmountMinor = v.InferOutput<typeof amountMinorSchema>;

export type ActiveSubscription = v.InferOutput<typeof activeSubscriptionSchema>;
export type CanceledSubscription = v.InferOutput<
  typeof canceledSubscriptionSchema
>;
export type Subscription = v.InferOutput<typeof subscriptionSchema>;

export const subscriptionIsCanceled = (
  subscription: Subscription,
): subscription is CanceledSubscription => subscription.status === "canceled";
