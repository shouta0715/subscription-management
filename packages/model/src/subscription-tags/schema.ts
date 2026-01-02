import * as v from "valibot";

import { timestampSchema } from "../common";
import { userIdSchema } from "../users/id";

import { subscriptionTagColorTokenSchema } from "./color";
import { subscriptionTagIdSchema } from "./id";

export const subscriptionTagSchema = v.object({
  id: subscriptionTagIdSchema,
  userId: userIdSchema,
  label: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(255)),
  colorToken: subscriptionTagColorTokenSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type SubscriptionTag = v.InferOutput<typeof subscriptionTagSchema>;
