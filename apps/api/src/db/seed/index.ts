// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from "dotenv";
import { seedCards } from "./cards";
import { seedFxRates } from "./fx-rates";
import { seedPaymentMethods } from "./payment-methods";
import { seedSubscriptionTags } from "./subscription-tags";
import { seedSubscriptions } from "./subscriptions";
import { seedUsers } from "./users";
import * as schemas from "@/db/schemas";
import { drizzleDatabase } from "@/helpers/drizzle";
import { parseEnv } from "@/helpers/env";

void config({ path: ".dev.vars" });

const env = parseEnv(process.env);

const db = drizzleDatabase({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
});

const clearDatabase = async () => {
  console.debug("🗑️  Clearing database...");

  await db.delete(schemas.subscriptionTagAssignment);
  await db.delete(schemas.subscriptionTag);
  await db.delete(schemas.subscription);
  await db.delete(schemas.paymentMethod);
  await db.delete(schemas.card);
  await db.delete(schemas.fxRateDaily);
  await db.delete(schemas.session);
  await db.delete(schemas.account);
  await db.delete(schemas.passkey);
  await db.delete(schemas.verification);
  await db.delete(schemas.user);

  console.debug("✅ Database cleared");
};

const seed = async () => {
  console.debug("🚀 Starting seed process...\n");

  try {
    // データベースをクリア
    await clearDatabase();
    console.debug("");

    // トランザクションでまとめてインサート処理（外部キー制約のため）
    await db.transaction(async (tx) => {
      // 1. ユーザー
      const users = await seedUsers(tx);
      console.debug("");

      // 2. カード（ユーザーに依存）
      const cards = await seedCards(tx, users);
      console.debug("");

      // 3. 支払い方法（ユーザーとカードに依存）
      const paymentMethods = await seedPaymentMethods(tx, users, cards);
      console.debug("");

      // 4. サブスクリプション（ユーザーと支払い方法に依存）
      const subscriptions = await seedSubscriptions(tx, users, paymentMethods);
      console.debug("");

      // 5. サブスクリプションタグ（ユーザーとサブスクリプションに依存）
      await seedSubscriptionTags(tx, users, subscriptions);
      console.debug("");
    });

    // 6. 為替レート（独立） → 外部キー依存しないのでトランザクション外でよい
    await seedFxRates(db);
    console.debug("");

    console.debug("🎉 Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }

  process.exit(0);
};

void seed();
