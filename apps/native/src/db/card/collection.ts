import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";

import { queryCardsHandler } from "./handlers/query";
import { cardQueryKey } from "./key";
import { cardCollectionSchema } from "./model";
import { queryClient } from "@/lib/query-client";

export const cardCollection = createCollection(
  queryCollectionOptions({
    queryKey: cardQueryKey.all,
    queryFn: queryCardsHandler,
    queryClient,
    getKey: (card) => card.id,
    schema: cardCollectionSchema,
  }),
);
