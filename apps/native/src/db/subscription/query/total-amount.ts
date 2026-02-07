import { PaymentMethodId } from "@package/model/payment-methods";
import { count, eq, sum } from "@tanstack/db";
import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { activeSubscriptionCollection } from "../collection";

export function useTotalSubscriptionAmountQuery(
  paymentMethodId: PaymentMethodId,
) {
  const { data, ...rest } = useLiveSuspenseQuery(
    (query) =>
      query
        .from({ subscription: activeSubscriptionCollection })
        .where(({ subscription }) =>
          eq(subscription.paymentMethodId, paymentMethodId),
        )
        .select(({ subscription }) => ({
          paymentMethodId: subscription.paymentMethodId,
          totalAmountMinor: sum(subscription.amountMinor),
          totalSubscriptions: count(subscription.id),
        }))
        .findOne(),
    [paymentMethodId],
  );

  const resultData = {
    paymentMethodId,
    totalAmountMinor: data?.totalAmountMinor ?? 0,
    totalSubscriptions: data?.totalSubscriptions ?? 0,
  };

  return {
    data: resultData,
    ...rest,
  };
}
