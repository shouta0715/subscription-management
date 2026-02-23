import { Divider, HStack, VStack } from "@expo/ui/swift-ui";
import {
  background,
  frame,
  padding,
  shapes,
} from "@expo/ui/swift-ui/modifiers";
import { isEmpty } from "@package/lib/guard";
import { FULL_SIZE } from "../modifiers/frame";
import { Host } from "../native/host";
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
    <Host className="size-full">
      <VStack
        alignment="leading"
        modifiers={[
          padding({ horizontal: 18, vertical: 10 }),
          frame({
            maxHeight: FULL_SIZE,
            maxWidth: FULL_SIZE,
          }),
          background("#4063d1", shapes.roundedRectangle({ cornerRadius: 22 })),
        ]}
        spacing={10}
      >
        <VStack alignment="leading" spacing={10}>
          <Text bold color="white" size={18} type="swift">
            {item.label}
          </Text>
          <Text color="white" size={14} type="swift">
            {item.card.brand}
          </Text>
          {!isEmpty(totalSubscriptions) && (
            <Text bold color="white" size={16} type="swift">
              {formatCurrency(totalAmountMinor, "JPY")} / 月
            </Text>
          )}
        </VStack>

        <VStack alignment="leading" spacing={8}>
          <Divider />
          <HStack spacing={16}>
            <VStack alignment="leading" spacing={2}>
              <Text color="white" size={12} type="swift">
                締め日
              </Text>
              <Text color="white" size={12} type="swift">
                {item.card.closingDay}日
              </Text>
            </VStack>
            <VStack alignment="leading" spacing={2}>
              <Text color="white" size={12} type="swift">
                支払日
              </Text>
              <Text color="white" size={12} type="swift">
                {item.card.paymentDay}日
              </Text>
            </VStack>
            {!isEmpty(totalSubscriptions) && (
              <VStack alignment="leading" spacing={2}>
                <Text color="white" size={12} type="swift">
                  サブスク
                </Text>
                <Text color="white" size={12} type="swift">
                  {totalSubscriptions}件
                </Text>
              </VStack>
            )}
          </HStack>
        </VStack>
      </VStack>
    </Host>
  );
}
