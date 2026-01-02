PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_fx_rate_daily` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`base_currency` text NOT NULL,
	`quote_currency` text NOT NULL,
	`rate_date` text NOT NULL,
	`rate` real NOT NULL,
	`fetched_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	CONSTRAINT "fx_rate_daily_rate_check" CHECK("__new_fx_rate_daily"."rate" > 0)
);
--> statement-breakpoint
INSERT INTO `__new_fx_rate_daily`("id", "base_currency", "quote_currency", "rate_date", "rate", "fetched_at", "created_at", "updated_at") SELECT "id", "base_currency", "quote_currency", "rate_date", "rate", "fetched_at", "created_at", "updated_at" FROM `fx_rate_daily`;--> statement-breakpoint
DROP TABLE `fx_rate_daily`;--> statement-breakpoint
ALTER TABLE `__new_fx_rate_daily` RENAME TO `fx_rate_daily`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `fx_rate_daily_currency_pair_date_idx` ON `fx_rate_daily` (`base_currency`,`quote_currency`,`rate_date`);--> statement-breakpoint
CREATE INDEX `fx_rate_daily_rate_date_idx` ON `fx_rate_daily` (`rate_date`);