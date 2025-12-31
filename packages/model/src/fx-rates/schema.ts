import * as v from "valibot";

import { yyyymmddSchema, timestampSchema } from "../common";

export const currencyCodeSchema = v.pipe(v.string(), v.regex(/^[A-Z]{3}$/));

export type CurrencyCode = v.InferOutput<typeof currencyCodeSchema>;

export const fxRateValueSchema = v.pipe(
  v.number(),
  v.check((value) => value > 0),
);

export type FxRateValue = v.InferOutput<typeof fxRateValueSchema>;

export const fxRateDailySchema = v.pipe(
  v.object({
    id: v.pipe(v.number(), v.integer()),
    baseCurrency: currencyCodeSchema,
    quoteCurrency: currencyCodeSchema,
    rateDate: yyyymmddSchema,
    rate: fxRateValueSchema,
    fetchedAt: timestampSchema,
    createdAt: timestampSchema,
    updatedAt: timestampSchema,
  }),
  v.check(({ baseCurrency, quoteCurrency }) => baseCurrency !== quoteCurrency),
);

export type FxRateDaily = v.InferOutput<typeof fxRateDailySchema>;
