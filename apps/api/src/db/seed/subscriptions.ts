/* eslint-disable no-console */
import { parseSchema } from "@package/lib/parser";
import { userIdSchema, yyyymmddSchema, type Yyyymmdd } from "@package/model";
import {
  paymentMethodIdSchema,
  type PaymentMethod,
  type PaymentMethodId,
} from "@package/model/payment-methods";
import {
  ActiveSubscription,
  activeSubscriptionSchema,
  CanceledSubscription,
  canceledSubscriptionSchema,
  subscriptionBillingUnits,
  subscriptionCurrencies,
  subscriptionIdSchema,
  subscriptionStatuses,
  type Subscription,
  type SubscriptionCurrency,
  type SubscriptionStatus,
} from "@package/model/subscriptions";
import { type UserId } from "@package/model/users";
import { User } from "better-auth";
import type { SeedDBOrTX } from "./types";
import { subscription } from "@/db/schemas/subscriptions";

const subscriptionNames = [
  "Netflix",
  "Spotify",
  "Amazon Prime",
  "YouTube Premium",
  "Disney+",
  "Apple Music",
  "Adobe CC",
  "GitHub Copilot",
  "Notion",
  "Figma",
  "Slack",
  "Zoom",
  "Dropbox",
  "Office 365",
  "iCloud+",
] as const;

const pickRandom = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)] as T;

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const toYyyymmdd = (date: Date): Yyyymmdd =>
  parseSchema(yyyymmddSchema, date.toISOString().split("T")[0] ?? "");

const createSubscriptionBase = (
  userId: UserId,
  paymentMethodId: PaymentMethodId,
  index: number,
  now: Date,
) => {
  const currency: SubscriptionCurrency = pickRandom(subscriptionCurrencies);

  const startDate: Date = new Date(now);
  startDate.setDate(startDate.getDate() - randomInt(0, 30));

  return {
    id: parseSchema(subscriptionIdSchema, crypto.randomUUID()),
    userId,
    paymentMethodId,
    name: `${pickRandom(subscriptionNames)}${index + 1}`,
    amountMinor:
      currency === "JPY" ? randomInt(1, 100) * 10000 : randomInt(1, 100) * 100,
    currency,
    billingUnit: pickRandom(subscriptionBillingUnits),
    billingStartDate: toYyyymmdd(startDate),
    createdAt: now,
    updatedAt: now,
    startDate,
  };
};

const createActiveSubscription = (
  userId: UserId,
  paymentMethodId: PaymentMethodId,
  index: number,
  now: Date,
): Subscription => {
  const base = createSubscriptionBase(userId, paymentMethodId, index, now);

  return parseSchema(activeSubscriptionSchema, {
    id: base.id,
    userId: base.userId,
    paymentMethodId: base.paymentMethodId,
    name: base.name,
    amountMinor: base.amountMinor,
    currency: base.currency,
    billingUnit: base.billingUnit,
    billingStartDate: base.billingStartDate,
    billingEndDate: null,
    canceledDate: null,
    status: "active",
    createdAt: base.createdAt,
    updatedAt: base.updatedAt,
  } satisfies ActiveSubscription);
};

const createCanceledSubscription = (
  userId: UserId,
  paymentMethodId: PaymentMethodId,
  index: number,
  now: Date,
): Subscription => {
  const base = createSubscriptionBase(userId, paymentMethodId, index, now);

  const canceledDateRaw: Date = new Date(base.startDate);
  canceledDateRaw.setDate(canceledDateRaw.getDate() + randomInt(0, 30));

  const endDateRaw: Date = new Date(canceledDateRaw);
  endDateRaw.setDate(endDateRaw.getDate() + randomInt(0, 30));

  return parseSchema(canceledSubscriptionSchema, {
    id: base.id,
    userId: base.userId,
    paymentMethodId: base.paymentMethodId,
    name: base.name,
    amountMinor: base.amountMinor,
    currency: base.currency,
    billingUnit: base.billingUnit,
    billingStartDate: base.billingStartDate,
    billingEndDate: toYyyymmdd(endDateRaw),
    canceledDate: toYyyymmdd(canceledDateRaw),
    status: "canceled",
    createdAt: base.createdAt,
    updatedAt: base.updatedAt,
  } satisfies CanceledSubscription);
};

const generateSubscriptions = (
  users: User[],
  paymentMethods: PaymentMethod[],
): Subscription[] => {
  const now: Date = new Date();

  const subscriptions: Subscription[][] = users.map((user: User) => {
    const userId: UserId = parseSchema(userIdSchema, user.id);
    const userPaymentMethods: PaymentMethod[] = paymentMethods.filter(
      (pm: PaymentMethod) => pm.userId === userId,
    );

    if (userPaymentMethods.length === 0) return [];

    const subCount: number = randomInt(5, 10);

    return Array.from({ length: subCount }, (_: unknown, i: number) => {
      const pm: PaymentMethod = pickRandom(userPaymentMethods);
      const paymentMethodId: PaymentMethodId = parseSchema(
        paymentMethodIdSchema,
        pm.id,
      );
      const status: SubscriptionStatus = pickRandom(subscriptionStatuses);

      return status === "active"
        ? createActiveSubscription(userId, paymentMethodId, i, now)
        : createCanceledSubscription(userId, paymentMethodId, i, now);
    });
  });

  return subscriptions.flat();
};

export const seedSubscriptions = async (
  db: SeedDBOrTX,
  users: User[],
  paymentMethods: PaymentMethod[],
): Promise<Subscription[]> => {
  console.log("🌱 Seeding subscriptions...");

  const subscriptions: Subscription[] = generateSubscriptions(
    users,
    paymentMethods,
  );

  await db.insert(subscription).values(subscriptions);

  console.log(`✅ Created ${subscriptions.length} subscriptions`);

  return subscriptions;
};
