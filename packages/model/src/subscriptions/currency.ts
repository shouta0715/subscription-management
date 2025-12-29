import * as v from "valibot";

export const subscriptionCurrencySchema = v.picklist(["JPY", "USD"]);

export const subscriptionCurrencies = subscriptionCurrencySchema.options;

export type SubscriptionCurrency = v.InferOutput<
  typeof subscriptionCurrencySchema
>;
