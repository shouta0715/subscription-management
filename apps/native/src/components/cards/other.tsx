import { View } from "react-native";
import { Text } from "@/components/native/text";
import type { OtherItem } from "@/types/payment-method";

type OtherPaymentMethodCardProps = {
  item: OtherItem;
};

export function OtherPaymentMethodCard({ item }: OtherPaymentMethodCardProps) {
  return (
    <View
      className="size-full items-center justify-center rounded-[22px] p-[18px]"
      style={{ backgroundColor: "#7A7C81" }}
    >
      <Text className="text-center text-lg font-bold text-white">
        {item.label}
      </Text>
    </View>
  );
}
