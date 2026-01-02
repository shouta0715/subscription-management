import * as v from "valibot";

export const subscriptionTagColorTokenSchema = v.picklist([
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
  "gray",
]);

export const subscriptionTagColorTokens =
  subscriptionTagColorTokenSchema.options;

export type SubscriptionTagColorToken = v.InferOutput<
  typeof subscriptionTagColorTokenSchema
>;
