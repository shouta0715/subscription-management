import * as v from "valibot";

export const idSchema = v.pipe(v.string(), v.uuid(), v.brand("Id"));

export type Id = v.InferOutput<typeof idSchema>;

export const generateId = (): Id => v.parse(idSchema, crypto.randomUUID());
