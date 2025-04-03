CREATE TYPE "public"."position" AS ENUM('POINT-GUARD', 'SHOOTING-GUARD', 'SMALL-FORWARD', 'POWER-FORWARD', 'CENTER');--> statement-breakpoint
CREATE TYPE "public"."season" AS ENUM('WINTER', 'SPRING', 'SUMMER', 'FALL');--> statement-breakpoint
CREATE TYPE "public"."season_type" AS ENUM('3x3', '5x5');--> statement-breakpoint
CREATE TYPE "public"."size" AS ENUM('XS', 'S', 'M', 'L', 'XL', '2XL', '3XL');--> statement-breakpoint
CREATE TABLE "players" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"captain" boolean DEFAULT false NOT NULL,
	"years_of_experience" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "player_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "borrow_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"jersey_id" uuid NOT NULL,
	"borrow_date" date DEFAULT now() NOT NULL,
	"due_date" date,
	"return_date" date,
	"status" "borrow_status" DEFAULT 'BORROWED' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "borrow_records_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "player_jerseys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"jersey_id" uuid NOT NULL,
	"status" "borrow_status" DEFAULT 'BORROWED' NOT NULL,
	"borrow_date" date DEFAULT now() NOT NULL,
	"return_date" date,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "player_jerseys_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "player_positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"position_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "player_positions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "player_seasons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"season_id" uuid NOT NULL,
	"paid" boolean DEFAULT false,
	"signed_consent" boolean DEFAULT false,
	"participation_status" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "player_seasons_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "player_teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"player_id" uuid NOT NULL,
	"team_id" uuid NOT NULL,
	CONSTRAINT "player_teams_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"position" "position",
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "positions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "seasons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"season" "season" NOT NULL,
	"season_number" integer NOT NULL,
	"year" integer DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::integer NOT NULL,
	"season_type" "season_type" NOT NULL,
	"season_start_date" date DEFAULT now(),
	"season_end_date" date DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "seasons_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"color" "color" NOT NULL,
	"name" varchar(30),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "teams_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "jerseys" ALTER COLUMN "color" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "jerseys" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "jerseys" ADD COLUMN "size" "size" NOT NULL;--> statement-breakpoint
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_jersey_id_jerseys_id_fk" FOREIGN KEY ("jersey_id") REFERENCES "public"."jerseys"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_jerseys" ADD CONSTRAINT "player_jerseys_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_jerseys" ADD CONSTRAINT "player_jerseys_jersey_id_jerseys_id_fk" FOREIGN KEY ("jersey_id") REFERENCES "public"."jerseys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_positions" ADD CONSTRAINT "player_positions_player_id_users_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_positions" ADD CONSTRAINT "player_positions_position_id_positions_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_seasons" ADD CONSTRAINT "player_seasons_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_seasons" ADD CONSTRAINT "player_seasons_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_teams" ADD CONSTRAINT "player_teams_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_teams" ADD CONSTRAINT "player_teams_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_users_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;