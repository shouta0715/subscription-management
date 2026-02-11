import * as v from "valibot";

export const subscriptionSortOrderSchema = v.picklist([
  "nextBillingDate",
  "name",
  "price",
]);

export const SUBSCRIPTION_SORT_OPTIONS = subscriptionSortOrderSchema.options;

export type SubscriptionSortOrder = v.InferOutput<
  typeof subscriptionSortOrderSchema
>;

export const DEFAULT_SORT_ORDER: SubscriptionSortOrder = "nextBillingDate";
