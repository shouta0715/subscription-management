import * as v from "valibot";

import { idSchema } from "../common";

export const subscriptionIdSchema = v.pipe(idSchema, v.brand("SubscriptionId"));

export type SubscriptionId = v.InferOutput<typeof subscriptionIdSchema>;
