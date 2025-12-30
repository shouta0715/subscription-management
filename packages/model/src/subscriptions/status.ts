import * as v from "valibot";

export const subscriptionStatusSchema = v.picklist(["active", "canceled"]);

export const subscriptionStatuses = subscriptionStatusSchema.options;

export type SubscriptionStatus = v.InferOutput<typeof subscriptionStatusSchema>;
