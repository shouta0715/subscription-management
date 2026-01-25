import { View } from "react-native";
import { Text } from "@/components/native/text";
import type { CardItem } from "@/types/payment-method";

type CardPaymentMethodCardProps = {
  item: CardItem;
};

export function CardPaymentMethodCard({ item }: CardPaymentMethodCardProps) {
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
        </View>
      </View>
    </View>
  );
}
