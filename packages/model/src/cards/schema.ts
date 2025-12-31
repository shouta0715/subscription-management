import * as v from "valibot";

import { daySchema, timestampSchema } from "../common";

import { userIdSchema } from "../users/id";
import { cardBrandSchema } from "./brand";
import { cardIdSchema } from "./id";

export const cardSchema = v.object({
  id: cardIdSchema,
  userId: userIdSchema,
  name: v.pipe(v.string(), v.minLength(1)),
  image: v.nullable(v.pipe(v.string(), v.url())),
  brand: cardBrandSchema,
  closingDay: daySchema,
  paymentDay: daySchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Card = v.InferOutput<typeof cardSchema>;
