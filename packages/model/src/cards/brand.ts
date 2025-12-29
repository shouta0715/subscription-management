import * as v from "valibot";

export const cardBrandSchema = v.picklist([
  "visa",
  "mastercard",
  "jcb",
  "amex",
  "dinersclub",
  "other",
]);

export const cardBrands = cardBrandSchema.options;

export type CardBrand = v.InferOutput<typeof cardBrandSchema>;
