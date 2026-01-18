/* eslint-disable import/no-extraneous-dependencies */
import { parseSchema } from "@package/lib/parser";
import { userIdSchema } from "@package/model";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { seedCards } from "./cards";
import { seedFxRates } from "./fx-rates";
import { seedPaymentMethods } from "./payment-methods";
import { seedSubscriptionTags } from "./subscription-tags";
import { seedSubscriptions } from "./subscriptions";
import * as schemas from "@/db/schemas";
import { drizzleDatabase } from "@/helpers/drizzle";
import { parseEnv } from "@/helpers/env";

void config({ path: ".dev.vars" });

const env = parseEnv(process.env);

const db = drizzleDatabase({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
});

const clearUserData = async (userId: string) => {
  console.debug("🗑️  Clearing user data...");

  // 外部キー制約の順序に従って削除（依存される側から）
  await db
    .delete(schemas.subscriptionTagAssignment)
    .where(eq(schemas.subscriptionTagAssignment.userId, userId));

  await db
    .delete(schemas.subscriptionTag)
    .where(eq(schemas.subscriptionTag.userId, userId));

  await db
    .delete(schemas.subscription)
    .where(eq(schemas.subscription.userId, userId));

  await db
    .delete(schemas.paymentMethod)
    .where(eq(schemas.paymentMethod.userId, userId));

  await db.delete(schemas.card).where(eq(schemas.card.userId, userId));

  // 為替レートは全件削除（グローバルデータ）
  await db.delete(schemas.fxRateDaily);

  console.debug("✅ User data cleared");
};

const seed = async () => {
  console.debug("🚀 Starting seed process...\n");

  try {
    // 1. コマンドライン引数からユーザーIDを取得
    const userId = process.argv[2];
    if (!userId) {
      console.error("❌ User ID is required");
      console.debug("Usage: pnpm db:seed <userId>");
      process.exit(1);
    }

    // 2. ユーザーIDのバリデーション
    let validatedUserId: string;
    try {
      validatedUserId = parseSchema(userIdSchema, userId);
    } catch (error) {
      console.error(`❌ Invalid user ID format: ${userId}`);
      console.error(error);
      process.exit(1);
    }

    // 3. ユーザーの存在確認
    const [existingUser] = await db
      .select()
      .from(schemas.user)
      .where(eq(schemas.user.id, validatedUserId));

    if (!existingUser) {
      console.error(`❌ User not found: ${userId}`);
      process.exit(1);
    }

    console.debug(
      `✅ Found user: ${existingUser.name} (${existingUser.email})`,
    );
    console.debug("");

    // 4. 指定ユーザーのデータを削除
    await clearUserData(validatedUserId);
    console.debug("");

    // 5. トランザクションでデータを作成
    await db.transaction(async (tx) => {
      // 既存ユーザーを配列に入れて各関数に渡す
      const users = [existingUser];

      const cards = await seedCards(tx, users);
      console.debug("");

      const paymentMethods = await seedPaymentMethods(tx, users, cards);
      console.debug("");

      const subscriptions = await seedSubscriptions(tx, users, paymentMethods);
      console.debug("");

      await seedSubscriptionTags(tx, users, subscriptions);
      console.debug("");
    });

    // 6. 為替レートを作成（トランザクション外）
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
