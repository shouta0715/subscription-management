import type { Card as CardType } from "@package/model/cards";
import { View } from "react-native";

import { Text } from "@/components/native/text";

type UserCardItemProps = {
  card: CardType;
};

export function UserCardItem({ card }: UserCardItemProps) {
  return (
    <View className="h-[190px] justify-between rounded-[22px] bg-[#1B2A57] p-[18px]">
      <View>
        <Text className="text-lg font-bold text-white">{card.name}</Text>
        <Text className="mt-1.5 text-sm uppercase text-white/85">
          {card.brand}
        </Text>
      </View>

      <View className="border-white/12 border-t pt-2.5">
        <View className="flex-row gap-4">
          <View>
            <Text className="text-xs text-white/70">締め日</Text>
            <Text className="mt-0.5 text-xs text-white/70">
              {card.closingDay}日
            </Text>
          </View>
          <View>
            <Text className="text-xs text-white/70">支払日</Text>
            <Text className="mt-0.5 text-xs text-white/70">
              {card.paymentDay}日
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
