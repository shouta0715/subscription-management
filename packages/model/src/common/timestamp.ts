import * as v from "valibot";

export const timestampSchema = v.union([
  v.pipe(
    v.string(),
    v.transform((v) => new Date(v)),
    v.date(),
  ),
  v.date(),
]);

export type Timestamp = v.InferOutput<typeof timestampSchema>;
