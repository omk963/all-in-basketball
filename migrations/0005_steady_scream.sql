ALTER TABLE "public"."jerseys" ALTER COLUMN "color" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "public"."teams" ALTER COLUMN "color" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."color";--> statement-breakpoint
CREATE TYPE "public"."color" AS ENUM('RED', 'ORANGE', 'GOLD', 'BLACK', 'WHITE', 'PRACTICE-RED', 'GREEN', 'ROYAL-BLUE', 'LIGHT-BLUE', 'PURPLE', 'PINK', 'PRACTICE-BLUE');--> statement-breakpoint
ALTER TABLE "public"."jerseys" ALTER COLUMN "color" SET DATA TYPE "public"."color" USING "color"::"public"."color";--> statement-breakpoint
ALTER TABLE "public"."teams" ALTER COLUMN "color" SET DATA TYPE "public"."color" USING "color"::"public"."color";