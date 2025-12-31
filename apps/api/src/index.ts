import { factory } from "./helpers/factory";
import { auth } from "./lib/auth";
import { requireSessionMiddleware } from "./middleware/auth/session";

const app = factory.createApp();

app.use(requireSessionMiddleware);

app.get("/health", (c) => c.text("OK"));

app.on(["POST", "GET"], "/api/auth/*", (c) => auth(c.env).handler(c.req.raw));

export default app;
