import { View } from "react-native";
import { Text } from "@/components/native/text";
import { useTotalSubscriptionAmountQuery } from "@/db/subscription/query/total-amount";
import type { OtherItem } from "@/types/payment-method";
import { formatCurrency } from "@/util/format-currency";

type OtherPaymentMethodCardProps = {
  item: OtherItem;
};

export function OtherPaymentMethodCard({ item }: OtherPaymentMethodCardProps) {
  const { data } = useTotalSubscriptionAmountQuery(item.id);

  const { totalAmountMinor, totalSubscriptions } = data;

  return (
    <View
      className="size-full justify-between rounded-[22px] p-[18px]"
      style={{ backgroundColor: "#7A7C81" }}
    >
      <View>
        <Text className="text-center text-lg font-bold text-white">
          {item.label}
        </Text>
        {totalSubscriptions > 0 && (
          <Text className="mt-2 text-center text-base font-semibold text-white">
            {formatCurrency(totalAmountMinor, "JPY")} / 月
          </Text>
        )}
      </View>

      {totalSubscriptions > 0 && (
        <View className="items-center">
          <Text className="text-xs text-white/70">
            サブスク {totalSubscriptions}件
          </Text>
        </View>
      )}
    </View>
  );
}
