import * as v from "valibot";

import { timestampSchema } from "../common";
import { userIdSchema } from "./id";

export const userSchema = v.object({
  id: userIdSchema,
  name: v.pipe(v.string(), v.minLength(1)),
  email: v.pipe(v.string(), v.email()),
  emailVerified: v.boolean(),
  image: v.nullable(v.pipe(v.string(), v.url())),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  isAnonymous: v.boolean(),
});

export type User = v.InferOutput<typeof userSchema>;
