import { HStack, VStack, Spacer, Image, Text } from "@expo/ui/swift-ui";
import {
  frame,
  background,
  shapes,
  font,
  lineLimit,
  foregroundStyle,
} from "@expo/ui/swift-ui/modifiers";
import { CanceledSubscription } from "@package/model/subscriptions";

import { formatDateFull, parseDate } from "@/util/format-date-japanese";

type CanceledSubscriptionItemProps = {
  subscription: CanceledSubscription;
};

export function CanceledSubscriptionItem({
  subscription,
}: CanceledSubscriptionItemProps) {
  const isCanceled =
    subscription.canceledDate === subscription.billingEndDate ||
    parseDate(subscription.billingEndDate) < new Date();

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
        <Text modifiers={[font({ size: 15, weight: "medium" }), lineLimit(1)]}>
          {subscription.name}
        </Text>
        {isCanceled ? (
          <Text
            modifiers={[
              font({ size: 14 }),
              foregroundStyle({ type: "color", color: "#8B4049" }),
            ]}
          >
            キャンセル済み：{formatDateFull(subscription.canceledDate)}
          </Text>
        ) : (
          <Text
            modifiers={[
              font({ size: 14 }),
              foregroundStyle({ type: "color", color: "#9A9A9A" }),
            ]}
          >
            終了日：{formatDateFull(subscription.billingEndDate)}
          </Text>
        )}
      </VStack>

      <Spacer />
      {/* 金額 */}
      <Image color="#9A9A9A" size={18} systemName="chevron.right" />
    </HStack>
  );
}
