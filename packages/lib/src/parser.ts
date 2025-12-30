import * as v from "valibot";
import type { GenericSchema } from "valibot";

export const parseSchema = (schema: GenericSchema, data: unknown) =>
  v.parse(schema, data);

export const safeParseSchema = (schema: GenericSchema, data: unknown) =>
  v.safeParse(schema, data);
