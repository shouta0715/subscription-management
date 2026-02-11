import { safeParseSchema } from "@package/lib/parser";
import { useCallback } from "react";
import { useMMKVString } from "react-native-mmkv";

import {
  DEFAULT_SORT_ORDER,
  SubscriptionSortOrder,
  subscriptionSortOrderSchema,
} from "../constant/sort-subscriptions";
import { STORAGE_KEYS } from "@/lib/storage/keys";

type Return = {
  sortOrder: SubscriptionSortOrder;
  setSortOrder: (order: SubscriptionSortOrder) => void;
  isActiveSortOrder: (order: SubscriptionSortOrder) => boolean;
};

export function useSubscriptionSort(): Return {
  const [stored, setStored] = useMMKVString(
    STORAGE_KEYS.subscription.sortOrder,
  );

  const sortOrder = (() => {
    const result = safeParseSchema(subscriptionSortOrderSchema, stored);

    if (result.success) {
      return result.output;
    }

    return DEFAULT_SORT_ORDER;
  })();

  const setSortOrder = useCallback(
    (order: SubscriptionSortOrder) => {
      setStored(order);
    },
    [setStored],
  );

  const isActiveSortOrder = useCallback(
    (order: SubscriptionSortOrder) => sortOrder === order,
    [sortOrder],
  );

  return { isActiveSortOrder, setSortOrder, sortOrder };
}
