import * as v from "valibot";

import { idSchema } from "../common";

export const paymentMethodIdSchema = v.pipe(
  idSchema,
  v.brand("PaymentMethodId"),
);

export type PaymentMethodId = v.InferOutput<typeof paymentMethodIdSchema>;
