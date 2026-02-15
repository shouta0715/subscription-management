import { HStack, VStack, Spacer, Image } from "@expo/ui/swift-ui";
import {
  frame,
  background,
  shapes,
  font,
  lineLimit,
  foregroundStyle,
} from "@expo/ui/swift-ui/modifiers";
import { ActiveSubscription } from "@package/model/subscriptions";

import React from "react";
import { Text } from "@/components/native/text";
import { formatBillingUnit } from "@/util/format-billing-unit";
import { formatCurrency } from "@/util/format-currency";
import { getNextBillingDate } from "@/util/get-next-billing-date";

type ActiveSubscriptionItemProps = {
  subscription: ActiveSubscription;
};

export function ActiveSubscriptionItem({
  subscription,
}: ActiveSubscriptionItemProps) {
  const nextBillingDate = getNextBillingDate(
    subscription.billingStartDate,
    subscription.billingUnit,
  );

  return (
    <HStack key={subscription.id} spacing={12}>
      {/* ロゴ */}
      <VStack
        modifiers={[
          frame({ width: 48, height: 48, alignment: "center" }),
          background("#F5F5F7", shapes.roundedRectangle({ cornerRadius: 12 })),
        ]}
      >
        <Image size={24} systemName="apple.homekit" />
      </VStack>

      {/* サービス情報 */}
      <VStack alignment="leading" spacing={2}>
        <Text
          modifiers={[font({ size: 15, weight: "medium" }), lineLimit(1)]}
          type="swift"
        >
          {subscription.name}
        </Text>
        <Text
          modifiers={[
            font({ size: 14 }),
            foregroundStyle({ type: "color", color: "#9A9A9A" }),
          ]}
          type="swift"
        >
          {formatBillingUnit(subscription.billingUnit)}
        </Text>
        <Text
          modifiers={[
            font({ size: 14 }),
            foregroundStyle({ type: "color", color: "#9A9A9A" }),
          ]}
          type="swift"
        >
          {nextBillingDate}
        </Text>
      </VStack>

      <Spacer />
      {/* 金額 */}
      <HStack spacing={8}>
        <Text modifiers={[font({ size: 15, weight: "medium" })]} type="swift">
          {formatCurrency(subscription.amountMinor, subscription.currency)}
        </Text>
        <Image color="#9A9A9A" size={18} systemName="chevron.right" />
      </HStack>
    </HStack>
  );
}
