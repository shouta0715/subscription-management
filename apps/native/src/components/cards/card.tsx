import { View } from "react-native";
import { Text } from "@/components/native/text";
import { useTotalSubscriptionAmountQuery } from "@/db/subscription/query/total-amount";
import type { CardItem } from "@/types/payment-method";
import { formatCurrency } from "@/util/format-currency";

type CardPaymentMethodCardProps = {
  item: CardItem;
};

export function CardPaymentMethodCard({ item }: CardPaymentMethodCardProps) {
  const { data } = useTotalSubscriptionAmountQuery(item.id);

  const { totalAmountMinor, totalSubscriptions } = data;

  return (
    <View
      className="size-full justify-between rounded-[22px] p-[18px]"
      style={{ backgroundColor: "#4063d1" }}
    >
      <View>
        <Text className="text-lg font-bold text-white">{item.label}</Text>
        <Text className="mt-1.5 text-sm uppercase text-white/85">
          {item.card.brand}
        </Text>
        {totalSubscriptions > 0 && (
          <Text className="mt-2 text-base font-semibold text-white">
            {formatCurrency(totalAmountMinor, "JPY")} / 月
          </Text>
        )}
      </View>

      <View className="border-white/12 border-t pt-2.5">
        <View className="flex-row gap-4">
          <View>
            <Text className="text-xs text-white/70">締め日</Text>
            <Text className="mt-0.5 text-xs text-white/70">
              {item.card.closingDay}日
            </Text>
          </View>
          <View>
            <Text className="text-xs text-white/70">支払日</Text>
            <Text className="mt-0.5 text-xs text-white/70">
              {item.card.paymentDay}日
            </Text>
          </View>
          {totalSubscriptions > 0 && (
            <View>
              <Text className="text-xs text-white/70">サブスク</Text>
              <Text className="mt-0.5 text-xs text-white/70">
                {totalSubscriptions}件
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
