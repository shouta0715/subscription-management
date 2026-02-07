import { SubscriptionBillingUnit } from "@package/model/subscriptions";
import { match } from "ts-pattern";

export function formatBillingUnit(unit: SubscriptionBillingUnit): string {
  return match(unit)
    .with("month", () => "月額")
    .with("year", () => "年額")
    .exhaustive();
}
