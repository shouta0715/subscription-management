import { queryCollectionOptions } from "@tanstack/query-db-collection";
import {
  createCollection,
  createLiveQueryCollection,
  eq,
} from "@tanstack/react-db";

import { querySubscriptionsHandler } from "./handlers/query";
import { subscriptionQueryKey } from "./key";
import { subscriptionCollectionSchema } from "./model";
import { queryClient } from "@/lib/query-client";

export const subscriptionCollection = createCollection(
  queryCollectionOptions({
    queryKey: subscriptionQueryKey.all,
    queryFn: querySubscriptionsHandler,
    queryClient,
    getKey: (subscription) => subscription.id,
    schema: subscriptionCollectionSchema,
  }),
);

export const activeSubscriptionCollection = createLiveQueryCollection((q) =>
  q
    .from({ subscription: subscriptionCollection })
    .where(({ subscription }) => eq(subscription.status, "active")),
);
