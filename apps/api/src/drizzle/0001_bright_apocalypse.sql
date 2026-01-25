PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_payment_method` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`type` text NOT NULL,
	`label` text NOT NULL,
	`card_id` text,
	`order` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`card_id`) REFERENCES `card`(`id`) ON UPDATE no action ON DELETE restrict,
	CONSTRAINT "payment_method_card_requires_cardId" CHECK("__new_payment_method"."type" != 'card' OR "__new_payment_method"."card_id" IS NOT NULL),
	CONSTRAINT "payment_method_order_check" CHECK("__new_payment_method"."order" >= 0)
);
--> statement-breakpoint
INSERT INTO `__new_payment_method`("id", "user_id", "type", "label", "card_id", "order", "created_at", "updated_at") SELECT "id", "user_id", "type", "label", "card_id", "order", "created_at", "updated_at" FROM `payment_method`;--> statement-breakpoint
DROP TABLE `payment_method`;--> statement-breakpoint
ALTER TABLE `__new_payment_method` RENAME TO `payment_method`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `payment_method_user_id_idx` ON `payment_method` (`user_id`);--> statement-breakpoint
CREATE INDEX `payment_method_card_id_idx` ON `payment_method` (`card_id`);