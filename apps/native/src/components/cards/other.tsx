import { VStack } from "@expo/ui/swift-ui";
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
import type { OtherItem } from "@/types/payment-method";
import { formatCurrency } from "@/util/format-currency";

type OtherPaymentMethodCardProps = {
  item: OtherItem;
};

export function OtherPaymentMethodCard({ item }: OtherPaymentMethodCardProps) {
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
          background("#7A7C81", shapes.roundedRectangle({ cornerRadius: 22 })),
        ]}
        spacing={10}
      >
        <Text bold color="white" size={18} type="swift">
          {item.label}
        </Text>
        {!isEmpty(totalSubscriptions) && (
          <Text bold color="white" type="swift">
            {formatCurrency(totalAmountMinor, "JPY")} / 月
          </Text>
        )}

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
      </VStack>
    </Host>
  );
}
