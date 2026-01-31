import { ActiveSubscription } from "@package/model/subscriptions";
import { View } from "react-native";
import { Text } from "@/components/native/text";
import { formatBillingUnit } from "@/util/format-billing-unit";
import { formatCurrency } from "@/util/format-currency";

type ActiveSubscriptionItemProps = {
  subscription: ActiveSubscription;
};

export function ActiveSubscriptionItem({
  subscription,
}: ActiveSubscriptionItemProps) {
  return (
    <View className="border-border group border-b py-3">
      <View className="flex-row items-center justify-between">
        {/* 左: サブスク名・情報 */}
        <View className="flex-1">
          <Text bold className="text-base">
            {subscription.name}
          </Text>
          <View className="mt-1">
            <Text className="text-muted text-sm">
              {formatBillingUnit(subscription.billingUnit)}
            </Text>
          </View>
        </View>

        {/* 右: 金額 */}
        <View className="items-end">
          <Text bold className="text-base">
            {formatCurrency(subscription.amountMinor, subscription.currency)}
          </Text>
        </View>
      </View>
    </View>
  );
}
