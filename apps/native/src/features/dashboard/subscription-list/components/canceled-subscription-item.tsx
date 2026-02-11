import { Ionicons } from "@expo/vector-icons";
import { CanceledSubscription } from "@package/model/subscriptions";
import { Card } from "heroui-native";
import { View } from "react-native";

import { Text } from "@/components/native/text";
import { cn } from "@/util/cn";
import { formatDateFull, parseDate } from "@/util/format-date-japanese";

type CanceledSubscriptionItemProps = {
  subscription: CanceledSubscription;
  isFirst: boolean;
  isLast: boolean;
};

export function CanceledSubscriptionItem({
  subscription,
  isFirst,
  isLast,
}: CanceledSubscriptionItemProps) {
  const isCanceled =
    subscription.canceledDate === subscription.billingEndDate ||
    parseDate(subscription.billingEndDate) < new Date();

  return (
    <Card
      className={cn(
        "rounded-none p-0",
        isFirst && "rounded-t-2xl",
        isLast && "rounded-b-2xl",
      )}
    >
      <View className="flex-row items-center gap-3 p-4">
        {/* ロゴ */}
        <View className="size-12 items-center justify-center rounded-xl bg-[#F5F5F7]">
          <Ionicons color="#000000" name="apps-outline" size={24} />
        </View>

        {/* サービス情報 */}
        <View className="flex-1 gap-0.5">
          <Text
            className="text-[15px] font-medium text-[#1C1C1C]"
            font="inter"
            numberOfLines={1}
          >
            {subscription.name}
          </Text>
          <Text className="text-xs text-[#9A9A9A]" font="inter">
            サブスクリプション
          </Text>
          {isCanceled ? (
            <Text className="text-xs text-[#8B4049]" font="inter">
              キャンセル済み：{formatDateFull(subscription.canceledDate)}
            </Text>
          ) : (
            <Text className="text-xs text-[#9A9A9A]" font="inter">
              終了日：{formatDateFull(subscription.billingEndDate)}
            </Text>
          )}
        </View>

        {/* 矢印アイコン */}
        <Ionicons color="#9A9A9A" name="chevron-forward" size={18} />
      </View>
    </Card>
  );
}
