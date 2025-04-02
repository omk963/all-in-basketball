CREATE TYPE "public"."color" AS ENUM('SILVER', 'BLACK', 'BLUE', 'GREEN', 'YELLOW', 'PINK', 'ORANGE');--> statement-breakpoint
CREATE TABLE "jerseys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" varchar(2) NOT NULL,
	"color" "color",
	"description" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "jerseys_id_unique" UNIQUE("id")
);
