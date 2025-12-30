CREATE TABLE `card` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`image` text,
	`brand` text NOT NULL,
	`closing_day` integer NOT NULL,
	`payment_day` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "card_closingDay_check" CHECK("card"."closing_day" >= 1 AND "card"."closing_day" <= 31),
	CONSTRAINT "card_paymentDay_check" CHECK("card"."payment_day" >= 1 AND "card"."payment_day" <= 31)
);
--> statement-breakpoint
CREATE INDEX `card_userId_idx` ON `card` (`user_id`);--> statement-breakpoint
CREATE TABLE `fx_rate_daily` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`base_currency` text NOT NULL,
	`quote_currency` text NOT NULL,
	`rate_date` text NOT NULL,
	`rate` real NOT NULL,
	`fetched_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `fx_rate_daily_currency_pair_date_idx` ON `fx_rate_daily` (`base_currency`,`quote_currency`,`rate_date`);--> statement-breakpoint
CREATE INDEX `fx_rate_daily_rateDate_idx` ON `fx_rate_daily` (`rate_date`);--> statement-breakpoint
CREATE TABLE `payment_method` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`label` text NOT NULL,
	`card_id` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`card_id`) REFERENCES `card`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "paymentMethod_card_requires_cardId" CHECK("payment_method"."type" != 'card' OR "payment_method"."card_id" IS NOT NULL)
);
--> statement-breakpoint
CREATE INDEX `paymentMethod_userId_idx` ON `payment_method` (`user_id`);--> statement-breakpoint
CREATE INDEX `paymentMethod_cardId_idx` ON `payment_method` (`card_id`);--> statement-breakpoint
CREATE TABLE `subscription` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`payment_method_id` text NOT NULL,
	`name` text NOT NULL,
	`amount_minor` integer NOT NULL,
	`currency` text NOT NULL,
	`billing_unit` text NOT NULL,
	`billing_start_date` text NOT NULL,
	`billing_end_date` text,
	`canceled_date` text,
	`status` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "subscription_amountMinor_check" CHECK("subscription"."amount_minor" >= 0)
);
--> statement-breakpoint
CREATE INDEX `subscription_userId_idx` ON `subscription` (`user_id`);--> statement-breakpoint
CREATE INDEX `subscription_paymentMethodId_idx` ON `subscription` (`payment_method_id`);--> statement-breakpoint
CREATE INDEX `subscription_status_idx` ON `subscription` (`status`);--> statement-breakpoint
CREATE INDEX `subscription_card_billing_idx` ON `subscription` (`payment_method_id`,`billing_start_date`,`billing_end_date`);