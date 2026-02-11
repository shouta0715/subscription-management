import { Ionicons } from "@expo/vector-icons";
import { ActiveSubscription } from "@package/model/subscriptions";
import { Card, cn } from "heroui-native";
import { View } from "react-native";

import { Text } from "@/components/native/text";
import { formatBillingUnit } from "@/util/format-billing-unit";
import { formatCurrency } from "@/util/format-currency";
import { getNextBillingDate } from "@/util/get-next-billing-date";

type ActiveSubscriptionItemProps = {
  subscription: ActiveSubscription;
  isFirst: boolean;
  isLast: boolean;
};

export function ActiveSubscriptionItem({
  subscription,
  isFirst,
  isLast,
}: ActiveSubscriptionItemProps) {
  const nextBillingDate = getNextBillingDate(
    subscription.billingStartDate,
    subscription.billingUnit,
  );

  return (
    <Card
      className={cn(
        "rounded-none p-0",
        isFirst && "rounded-t-2xl",
        isLast && "rounded-b-2xl",
      )}
    >
      <View className="flex-row items-center gap-3 p-4">
        {/* ロゴ */}
        <View className="size-12 items-center justify-center rounded-xl bg-[#F5F5F7]">
          <Ionicons color="#000000" name="apps-outline" size={24} />
        </View>

        {/* サービス情報 */}
        <View className="flex-1 gap-0.5">
          <Text
            className="text-[15px] font-medium text-[#1C1C1C]"
            font="inter"
            numberOfLines={1}
          >
            {subscription.name}
          </Text>
          <Text className="text-xs text-[#9A9A9A]" font="inter">
            {formatBillingUnit(subscription.billingUnit)}
          </Text>
          <Text className="text-xs text-[#9A9A9A]" font="inter">
            {nextBillingDate}
          </Text>
        </View>

        {/* 金額と矢印 */}
        <View className="flex-row items-center gap-1">
          <Text className="text-[15px] font-medium text-[#1C1C1C]" font="inter">
            {formatCurrency(subscription.amountMinor, subscription.currency)}
          </Text>
          <Ionicons color="#9A9A9A" name="chevron-forward" size={18} />
        </View>
      </View>
    </Card>
  );
}
