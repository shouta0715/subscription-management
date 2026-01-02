import * as v from "valibot";

import { idSchema } from "../common";

export const subscriptionTagIdSchema = v.pipe(
  idSchema,
  v.brand("SubscriptionTagId"),
);

export type SubscriptionTagId = v.InferOutput<typeof subscriptionTagIdSchema>;
