import * as v from "valibot";

export const timestampSchema = v.date();

export type Timestamp = v.InferOutput<typeof timestampSchema>;
