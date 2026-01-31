import { isEmpty } from "@package/lib/guard";
import { PaymentMethodId } from "@package/model/payment-methods";
import {
  ActiveSubscription,
  CanceledSubscription,
  Subscription,
} from "@package/model/subscriptions";
import { eq } from "@tanstack/db";
import { useLiveSuspenseQuery } from "@tanstack/react-db";
import React, { useMemo } from "react";
import { SectionList, View } from "react-native";
import { match } from "ts-pattern";

import { ActiveSubscriptionItem } from "./active-subscription-item";
import { CanceledSubscriptionItem } from "./canceled-subscription-item";
import { Text } from "@/components/native/text";
import { subscriptionCollection } from "@/db/subscription/collection";

type SubscriptionListProps = {
  paymentMethodId: PaymentMethodId;
};

type SubscriptionSection = {
  title: string;
  data: (ActiveSubscription | CanceledSubscription)[];
  type: "active" | "canceled";
};

function partitionSubscriptions(subscriptions: Subscription[]) {
  const activeSubscriptions: ActiveSubscription[] = [];
  const canceledSubscriptions: CanceledSubscription[] = [];

  for (const subscription of subscriptions) {
    if (subscription.status === "active") {
      activeSubscriptions.push(subscription);
    } else {
      canceledSubscriptions.push(subscription);
    }
  }

  return { activeSubscriptions, canceledSubscriptions };
}

export function SubscriptionList({ paymentMethodId }: SubscriptionListProps) {
  const { data: subscriptions } = useLiveSuspenseQuery(
    (query) =>
      query
        .from({ subscription: subscriptionCollection })
        .where(({ subscription }) =>
          eq(subscription.paymentMethodId, paymentMethodId),
        )
        .orderBy(({ subscription }) => subscription.billingStartDate, "desc"),

    [paymentMethodId],
  );

  const { activeSubscriptions, canceledSubscriptions } =
    partitionSubscriptions(subscriptions);

  const sections: SubscriptionSection[] = useMemo(
    () => [
      {
        title: "有効",
        data: activeSubscriptions,
        type: "active" as const,
      },
      {
        title: "無効",
        data: canceledSubscriptions,
        type: "canceled" as const,
      },
    ],
    [activeSubscriptions, canceledSubscriptions],
  );

  return (
    <SectionList
      stickySectionHeadersEnabled
      ListHeaderComponent={
        <View className="my-2">
          <Text bold>サブスクリプション</Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 32 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        match(item)
          .with({ status: "active" }, (activeItem) => (
            <ActiveSubscriptionItem subscription={activeItem} />
          ))
          .with({ status: "canceled" }, (canceledItem) => (
            <CanceledSubscriptionItem subscription={canceledItem} />
          ))
          .exhaustive()
      }
      renderSectionFooter={({ section }) => {
        if (isEmpty(section.data)) {
          return (
            <Text bold className="text-muted mt-2">
              {`${section.title} なサブスクリプションがありません`}
            </Text>
          );
        }

        return null;
      }}
      renderSectionHeader={({ section }) => (
        <View className="bg-background py-2">
          <Text bold className="text-muted text-sm">
            {section.title}
          </Text>
        </View>
      )}
      sections={sections}
    />
  );
}
