import { Yyyymmdd } from "@package/model/common";
import { SubscriptionBillingUnit } from "@package/model/subscriptions";
import { match } from "ts-pattern";

import { formatDateShort, parseDate } from "@/util/format-date-japanese";

/**
 * 請求開始日と請求単位から次回請求日を計算し、
 * 「次回請求日：M月D日」または「更新日：M月D日」形式で返す
 */
export function getNextBillingDate(
  billingStartDate: Yyyymmdd,
  billingUnit: SubscriptionBillingUnit,
): string {
  const startDate = parseDate(billingStartDate);
  const today = new Date();
  const nextDate = new Date(startDate);

  match(billingUnit)
    .with("month", () => {
      while (nextDate <= today) {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }
    })
    .with("year", () => {
      while (nextDate <= today) {
        nextDate.setFullYear(nextDate.getFullYear() + 1);
      }
    })
    .exhaustive();

  const yyyy = nextDate.getFullYear().toString();
  const mm = (nextDate.getMonth() + 1).toString().padStart(2, "0");
  const dd = nextDate.getDate().toString().padStart(2, "0");
  const formatted = formatDateShort(`${yyyy}-${mm}-${dd}` as Yyyymmdd);

  const label = match(billingUnit)
    .with("month", () => "次回請求日")
    .with("year", () => "更新日")
    .exhaustive();

  return `${label}：${formatted}`;
}
