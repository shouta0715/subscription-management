import * as v from "valibot";

export const subscriptionBillingUnitSchema = v.picklist(["month", "year"]);

export const subscriptionBillingUnits = subscriptionBillingUnitSchema.options;

export type SubscriptionBillingUnit = v.InferOutput<
  typeof subscriptionBillingUnitSchema
>;
