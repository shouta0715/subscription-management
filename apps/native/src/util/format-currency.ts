import { SubscriptionCurrency } from "@package/model/subscriptions";
import { match } from "ts-pattern";

export function formatCurrency(
  amountMinor: number,
  currency: SubscriptionCurrency,
): string {
  const amount = amountMinor / 100;

  return match(currency)
    .with("JPY", () => `¥${amount.toLocaleString("ja-JP")}`)
    .with(
      "USD",
      () =>
        `$${amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    )
    .exhaustive();
}
