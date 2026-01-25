import { View } from "react-native";
import { Text } from "@/components/native/text";
import type { AppleItem } from "@/types/payment-method";

type ApplePaymentMethodCardProps = {
  item: AppleItem;
};

export function ApplePaymentMethodCard({ item }: ApplePaymentMethodCardProps) {
  return (
    <View
      className="size-full items-center justify-center rounded-[22px] p-[18px]"
      style={{ backgroundColor: "#191919" }}
    >
      <Text className="text-center text-lg font-bold text-white">
        {item.label}
      </Text>
    </View>
  );
}
