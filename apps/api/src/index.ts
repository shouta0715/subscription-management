import { factory } from "./helpers/factory";
import { auth } from "./lib/auth";
import { requireSessionMiddleware } from "./middleware/auth/session";
import { cardsRouter } from "./routers/cards/route";
import { paymentMethodsRouter } from "./routers/payment-methods/route";
import { subscriptionTagsRouter } from "./routers/subscription-tags/route";
import { subscriptionsRouter } from "./routers/subscriptions/route";

const app = factory.createApp();

app.use(requireSessionMiddleware);

app.get("/health", (c) => c.text("OK"));

app.route("/cards", cardsRouter);
app.route("/payment-methods", paymentMethodsRouter);
app.route("/subscriptions", subscriptionsRouter);
app.route("/subscription-tags", subscriptionTagsRouter);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth(c.env).handler(c.req.raw));

export default app;
