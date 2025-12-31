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

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

const requireSessionMiddlewareWithExcept = except(
  ["/api/auth/*", "/health"],
  requireSessionMiddleware,
);

export { requireSessionMiddlewareWithExcept as requireSessionMiddleware };
