import * as v from "valibot";

import { idSchema } from "../common";

export const cardIdSchema = v.pipe(idSchema, v.brand("CardId"));

export type CardId = v.InferOutput<typeof cardIdSchema>;
