CREATE TABLE `subscription_tag` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`label` text NOT NULL,
	`color_token` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `subscription_tag_userId_idx` ON `subscription_tag` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscription_tag_userId_label_idx` ON `subscription_tag` (`user_id`,`label`);--> statement-breakpoint
CREATE TABLE `subscription_tag_assignment` (
	`user_id` text NOT NULL,
	`subscription_id` text NOT NULL,
	`subscription_tag_id` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	PRIMARY KEY(`user_id`, `subscription_id`, `subscription_tag_id`),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`subscription_id`) REFERENCES `subscription`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`subscription_tag_id`) REFERENCES `subscription_tag`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `subscription_tag_assignment_userId_tagId_idx` ON `subscription_tag_assignment` (`user_id`,`subscription_tag_id`);