import * as v from "valibot";
import { idSchema } from "../common";

export const userIdSchema = v.pipe(idSchema, v.brand("UserId"));

export type UserId = v.InferOutput<typeof userIdSchema>;
