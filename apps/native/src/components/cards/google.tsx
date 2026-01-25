import { View } from "react-native";
import { Text } from "@/components/native/text";
import type { GoogleItem } from "@/types/payment-method";

type GooglePaymentMethodCardProps = {
  item: GoogleItem;
};

export function GooglePaymentMethodCard({
  item,
}: GooglePaymentMethodCardProps) {
  return (
    <View
      className="size-full items-center justify-center rounded-[22px] p-[18px]"
      style={{ backgroundColor: "#4285F4" }}
    >
      <Text className="text-center text-lg font-bold text-white">
        {item.label}
      </Text>
    </View>
  );
}
