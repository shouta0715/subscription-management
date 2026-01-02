/* eslint-disable no-console */
import { parseSchema } from "@package/lib/parser";
import {
  CurrencyCode,
  FxRateDaily,
  fxRateDailySchema,
  yyyymmddSchema,
} from "@package/model";
import type { SeedDBOrTX } from "./types";
import { fxRateDaily } from "@/db/schemas/fx-rates";

const BATCH_SIZE = 50;

const generateFxRates = (): FxRateDaily[] => {
  const now = new Date();
  const threeMonthsAgo = new Date(now);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const dayCount = Math.ceil(
    (now.getTime() - threeMonthsAgo.getTime()) / (1000 * 60 * 60 * 24),
  );

  return Array.from({ length: dayCount + 1 }, (_, i) => {
    const date = new Date(threeMonthsAgo);
    date.setDate(date.getDate() + i);

    const dateStr = date.toISOString().split("T")[0] ?? "";
    const usdJpyRate = 150 + (Math.random() - 0.5) * 5;

    const data = {
      id: i,
      baseCurrency: "USD" satisfies CurrencyCode,
      quoteCurrency: "JPY" satisfies CurrencyCode,
      rateDate: parseSchema(yyyymmddSchema, dateStr),
      rate: usdJpyRate,
      fetchedAt: date,
      createdAt: now,
      updatedAt: now,
    } satisfies FxRateDaily;

    return parseSchema(fxRateDailySchema, data);
  });
};

export const seedFxRates = async (db: SeedDBOrTX): Promise<FxRateDaily[]> => {
  console.log("🌱 Seeding FX rates...");

  const fxRates = generateFxRates();

  const batches: FxRateDaily[][] = [];
  for (let i = 0; i < fxRates.length; i += BATCH_SIZE) {
    batches.push(fxRates.slice(i, i + BATCH_SIZE));
  }

  await Promise.all(
    batches.map((batch) => db.insert(fxRateDaily).values(batch)),
  );

  console.log(`✅ Created ${fxRates.length} FX rates`);

  return fxRates;
};
