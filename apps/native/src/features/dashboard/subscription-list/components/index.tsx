import { isEmpty } from "@package/lib/guard";
import { PaymentMethodId } from "@package/model/payment-methods";
import {
  ActiveSubscription,
  CanceledSubscription,
  Subscription,
} from "@package/model/subscriptions";
import { eq } from "@tanstack/db";
import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollShadow } from "heroui-native";
import React, { useMemo } from "react";
import { SectionList, View } from "react-native";
import { match } from "ts-pattern";

import { useSubscriptionSort } from "../hooks/use-subscription-sort";
import { ActiveSubscriptionItem } from "./active-subscription-item";
import { CanceledSubscriptionItem } from "./canceled-subscription-item";
import { SubscriptionSortMenu } from "./subscription-sort-menu";
import { Text } from "@/components/native/text";
import { subscriptionCollection } from "@/db/subscription/collection";
import { cn } from "@/util/cn";

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
  const { sortOrder } = useSubscriptionSort();

  const { data: subscriptions } = useLiveSuspenseQuery(
    (query) => {
      const base = query
        .from({ subscription: subscriptionCollection })
        .where(({ subscription }) =>
          eq(subscription.paymentMethodId, paymentMethodId),
        );

      return match(sortOrder)
        .with("nextBillingDate", () =>
          base.orderBy(
            ({ subscription }) => subscription.billingStartDate,
            "asc",
          ),
        )
        .with("name", () =>
          base.orderBy(({ subscription }) => subscription.name, "asc"),
        )
        .with("price", () =>
          base.orderBy(({ subscription }) => subscription.amountMinor, "desc"),
        )
        .exhaustive();
    },
    [paymentMethodId, sortOrder],
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
    <ScrollShadow
      LinearGradientComponent={LinearGradient}
      color="#f2f2f2"
      size={20}
    >
      <SectionList
        stickyHeaderHiddenOnScroll
        className="p-4"
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) =>
          match(item)
            .with({ status: "active" }, (activeItem) => (
              <ActiveSubscriptionItem
                isFirst={index === 0}
                isLast={index === activeSubscriptions.length - 1}
                subscription={activeItem}
              />
            ))
            .with({ status: "canceled" }, (canceledItem) => (
              <CanceledSubscriptionItem
                isFirst={index === 0}
                isLast={index === canceledSubscriptions.length - 1}
                subscription={canceledItem}
              />
            ))
            .exhaustive()
        }
        renderSectionFooter={({ section }) => {
          if (isEmpty(section.data)) {
            return (
              <Text className="text-muted mt-2 text-sm" font="inter">
                {`${section.title}なサブスクリプションがありません`}
              </Text>
            );
          }

          return null;
        }}
        renderSectionHeader={({ section }) => (
          <View
            className={cn(
              "flex-row items-center justify-between pb-2",
              section.type === "canceled" && "pt-4",
            )}
          >
            <Text bold className="text-muted">
              {section.title}
            </Text>
            {section.type === "active" && <SubscriptionSortMenu />}
          </View>
        )}
        sections={sections}
      />
    </ScrollShadow>
  );
}
