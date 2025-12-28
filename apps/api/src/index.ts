import { factory } from "./helpers/factory";

const app = factory.createApp();

app.get("/", (c) => c.text("Hello Hono!"));

export default app;
