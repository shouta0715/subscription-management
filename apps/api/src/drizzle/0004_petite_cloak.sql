PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_card` (
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
	CONSTRAINT "card_closing_day_check" CHECK("__new_card"."closing_day" >= 1 AND "__new_card"."closing_day" <= 31),
	CONSTRAINT "card_payment_day_check" CHECK("__new_card"."payment_day" >= 1 AND "__new_card"."payment_day" <= 31)
);
--> statement-breakpoint
INSERT INTO `__new_card`("id", "user_id", "name", "image", "brand", "closing_day", "payment_day", "created_at", "updated_at") SELECT "id", "user_id", "name", "image", "brand", "closing_day", "payment_day", "created_at", "updated_at" FROM `card`;--> statement-breakpoint
DROP TABLE `card`;--> statement-breakpoint
ALTER TABLE `__new_card` RENAME TO `card`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `card_user_id_idx` ON `card` (`user_id`);--> statement-breakpoint
CREATE TABLE `__new_payment_method` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`label` text NOT NULL,
	`card_id` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`card_id`) REFERENCES `card`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "payment_method_card_requires_cardId" CHECK("__new_payment_method"."type" != 'card' OR "__new_payment_method"."card_id" IS NOT NULL)
);
--> statement-breakpoint
INSERT INTO `__new_payment_method`("id", "user_id", "type", "label", "card_id", "created_at", "updated_at") SELECT "id", "user_id", "type", "label", "card_id", "created_at", "updated_at" FROM `payment_method`;--> statement-breakpoint
DROP TABLE `payment_method`;--> statement-breakpoint
ALTER TABLE `__new_payment_method` RENAME TO `payment_method`;--> statement-breakpoint
CREATE INDEX `payment_method_user_id_idx` ON `payment_method` (`user_id`);--> statement-breakpoint
CREATE INDEX `payment_method_card_id_idx` ON `payment_method` (`card_id`);--> statement-breakpoint
CREATE TABLE `__new_subscription` (
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
	CONSTRAINT "subscription_amount_minor_check" CHECK("__new_subscription"."amount_minor" >= 0)
);
--> statement-breakpoint
INSERT INTO `__new_subscription`("id", "user_id", "payment_method_id", "name", "amount_minor", "currency", "billing_unit", "billing_start_date", "billing_end_date", "canceled_date", "status", "created_at", "updated_at") SELECT "id", "user_id", "payment_method_id", "name", "amount_minor", "currency", "billing_unit", "billing_start_date", "billing_end_date", "canceled_date", "status", "created_at", "updated_at" FROM `subscription`;--> statement-breakpoint
DROP TABLE `subscription`;--> statement-breakpoint
ALTER TABLE `__new_subscription` RENAME TO `subscription`;--> statement-breakpoint
CREATE INDEX `subscription_user_id_idx` ON `subscription` (`user_id`);--> statement-breakpoint
CREATE INDEX `subscription_status_idx` ON `subscription` (`status`);--> statement-breakpoint
CREATE INDEX `subscription_billing_idx` ON `subscription` (`payment_method_id`,`billing_start_date`,`billing_end_date`);--> statement-breakpoint
DROP INDEX `subscription_tag_userId_idx`;--> statement-breakpoint
DROP INDEX `subscription_tag_userId_label_idx`;--> statement-breakpoint
CREATE UNIQUE INDEX `subscription_tag_user_id_label_idx` ON `subscription_tag` (`user_id`,`label`);--> statement-breakpoint
DROP INDEX `subscription_tag_assignment_userId_tagId_idx`;--> statement-breakpoint
CREATE INDEX `subscription_tag_assignment_user_id_tag_id_idx` ON `subscription_tag_assignment` (`user_id`,`subscription_tag_id`);