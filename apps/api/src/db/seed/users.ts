/* eslint-disable no-console */
import { parseSchema } from "@package/lib/parser";
import { userIdSchema } from "@package/model";
import { User } from "better-auth";
import type { SeedDBOrTX } from "./types";
import { account, user } from "@/db/schemas/users";

const generateUsers = (count: number): User[] =>
  Array.from({ length: count }, (_, i) => ({
    id: parseSchema(userIdSchema, crypto.randomUUID()),
    name: `ユーザー${i + 1}`,
    email: `user${i + 1}@example.com`,
    emailVerified: Math.random() > 0.2,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

export const seedUsers = async (db: SeedDBOrTX): Promise<User[]> => {
  console.log("🌱 Seeding users...");

  const users = generateUsers(50);

  await db.insert(user).values(users);

  const accounts = users.map((u) => ({
    id: crypto.randomUUID(),
    accountId: u.id,
    providerId: "credential",
    userId: u.id,
    password: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await db.insert(account).values(accounts);

  console.log(`✅ Created ${users.length} users`);

  return users;
};
