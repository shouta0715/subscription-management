/* eslint-disable no-console */
import { parseSchema } from "@package/lib/parser";
import { userIdSchema, type UserId } from "@package/model";
import {
  subscriptionTagColorTokens,
  subscriptionTagIdSchema,
  subscriptionTagSchema,
  type SubscriptionTag,
  type SubscriptionTagId,
} from "@package/model/subscription-tags";
import {
  subscriptionIdSchema,
  type Subscription,
  type SubscriptionId,
} from "@package/model/subscriptions";
import { User } from "better-auth";
import type { SeedDBOrTX } from "./types";
import {
  subscriptionTag,
  subscriptionTagAssignment,
} from "@/db/schemas/subscription-tags";

type SubscriptionTagAssignmentInsert = {
  userId: UserId;
  subscriptionId: SubscriptionId;
  subscriptionTagId: SubscriptionTagId;
  createdAt: Date;
};

const tagLabels = [
  "エンタメ",
  "音楽",
  "動画",
  "仕事",
  "開発ツール",
  "ストレージ",
  "コミュニケーション",
  "デザイン",
  "学習",
  "その他",
] as const;

const pickRandom = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)] as T;

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = <T>(arr: readonly T[]): T[] =>
  [...arr].sort(() => Math.random() - 0.5);

const generateSubscriptionTags = (users: User[]): SubscriptionTag[] => {
  const now = new Date();

  return users.flatMap((user) => {
    const userId = parseSchema(userIdSchema, user.id);
    const tagCount = randomInt(2, 6);
    const selectedLabels = shuffle(tagLabels).slice(0, tagCount);

    return selectedLabels.map((label) =>
      parseSchema(subscriptionTagSchema, {
        id: parseSchema(subscriptionTagIdSchema, crypto.randomUUID()),
        userId,
        label,
        colorToken: pickRandom(subscriptionTagColorTokens),
        createdAt: now,
        updatedAt: now,
      } satisfies SubscriptionTag),
    );
  });
};

const generateSubscriptionTagAssignments = (
  subscriptions: Subscription[],
  tags: SubscriptionTag[],
): SubscriptionTagAssignmentInsert[] => {
  const now = new Date();

  return subscriptions.flatMap((sub) => {
    const userTags = tags.filter((t) => t.userId === sub.userId);
    if (userTags.length === 0) return [];

    const assignCount = randomInt(0, Math.min(3, userTags.length));
    const shuffled = [...userTags].sort(() => Math.random() - 0.5);
    const selectedTags = shuffled.slice(0, assignCount);

    return selectedTags.map((tag) => ({
      userId: sub.userId,
      subscriptionId: parseSchema(subscriptionIdSchema, sub.id),
      subscriptionTagId: parseSchema(subscriptionTagIdSchema, tag.id),
      createdAt: now,
    }));
  });
};

export const seedSubscriptionTags = async (
  db: SeedDBOrTX,
  users: User[],
  subscriptions: Subscription[],
): Promise<SubscriptionTag[]> => {
  console.log("🌱 Seeding subscription tags...");

  const tagsData = generateSubscriptionTags(users);

  if (tagsData.length > 0) {
    await db.insert(subscriptionTag).values(tagsData);
  }

  console.log(`✅ Created ${tagsData.length} subscription tags`);

  const assignmentsData = generateSubscriptionTagAssignments(
    subscriptions,
    tagsData,
  );

  if (assignmentsData.length > 0) {
    await db.insert(subscriptionTagAssignment).values(assignmentsData);
  }

  console.log(`✅ Created ${assignmentsData.length} tag assignments`);

  return tagsData;
};
