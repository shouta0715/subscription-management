import { HStack, List, Section, Spacer, Text } from "@expo/ui/swift-ui";
import { listStyle } from "@expo/ui/swift-ui/modifiers";
import { PaymentMethodId } from "@package/model/payment-methods";
import {
  ActiveSubscription,
  CanceledSubscription,
  Subscription,
} from "@package/model/subscriptions";
import { eq } from "@tanstack/db";
import { useLiveSuspenseQuery } from "@tanstack/react-db";
import React from "react";
import { match } from "ts-pattern";

import { useSubscriptionSort } from "../hooks/use-subscription-sort";
import { ActiveSubscriptionItem } from "./active-subscription-item";
import { CanceledSubscriptionItem } from "./canceled-subscription-item";
import { SubscriptionSortMenu } from "./subscription-sort-menu";
import { Host } from "@/components/native/host";
import { subscriptionCollection } from "@/db/subscription/collection";

type SubscriptionListProps = {
  paymentMethodId: PaymentMethodId;
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

  return (
    <Host className="flex-1">
      <List modifiers={[listStyle("insetGrouped")]}>
        <Section
          header={
            <HStack alignment="center">
              <Text>有効</Text>
              <Spacer />
              <SubscriptionSortMenu />
            </HStack>
          }
        >
          <List.ForEach>
            {activeSubscriptions.map((subscription) => (
              <ActiveSubscriptionItem
                key={subscription.id}
                subscription={subscription}
              />
            ))}
          </List.ForEach>
        </Section>

        <Section title="無効">
          <List.ForEach>
            {canceledSubscriptions.map((subscription) => (
              <CanceledSubscriptionItem
                key={subscription.id}
                subscription={subscription}
              />
            ))}
          </List.ForEach>
        </Section>
      </List>
    </Host>
  );
}
