import * as v from "valibot";

const dayNumberSchema = v.pipe(
  v.number(),
  v.integer(),
  v.minValue(1),
  v.maxValue(31),
);

export const daySchema = v.union([
  v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(31)),
  v.pipe(v.string(), v.transform(Number), dayNumberSchema),
]);

export type Day = v.InferOutput<typeof daySchema>;
