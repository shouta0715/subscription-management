import { safeParseSchema } from "@package/lib/parser";
import { userSchema } from "@package/model";
import { except } from "hono/combine";
import { createMiddleware } from "hono/factory";
import { auth } from "@/lib/auth";
import { AppEnv } from "@/types/app-env";

const requireSessionMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const session = await auth(c.env).api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const parsedUser = safeParseSchema(userSchema, session.user);

  if (!parsedUser.success) {
    return c.json({ error: "Invalid user" }, 401);
  }

  c.set("user", parsedUser.output);
  await next();
});

const requireSessionMiddlewareWithExcept = except(
  ["/api/auth/*", "/health"],
  requireSessionMiddleware,
);

export { requireSessionMiddlewareWithExcept as requireSessionMiddleware };
