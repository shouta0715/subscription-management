import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createCollection } from "@tanstack/react-db";

import { queryPaymentMethodsHandler } from "./handlers/query";
import { paymentMethodQueryKey } from "./key";
import { paymentMethodCollectionSchema } from "./model";
import { queryClient } from "@/lib/query-client";

export const paymentMethodCollection = createCollection(
  queryCollectionOptions({
    queryKey: paymentMethodQueryKey.all,
    queryFn: queryPaymentMethodsHandler,
    queryClient,
    getKey: (paymentMethod) => paymentMethod.id,
    schema: paymentMethodCollectionSchema,
  }),
);
