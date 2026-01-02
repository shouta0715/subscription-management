import * as v from "valibot";
import type { GenericSchema } from "valibot";

export const parseSchema = <T extends GenericSchema>(
  schema: T,
  data: unknown,
): v.InferOutput<T> => v.parse(schema, data);

export const safeParseSchema = <T extends GenericSchema>(
  schema: T,
  data: unknown,
): v.SafeParseResult<T> => v.safeParse(schema, data);
