import { sql } from "drizzle-orm";
import {
  text,
  boolean,
  pgTable,
  uuid,
  varchar,
  pgEnum,
  date,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["PLAYER", "ADMIN", "MODERATOR"]);
export const POSITION_ENUM = pgEnum("position", [
  "POINT-GUARD",
  "SHOOTING-GUARD",
  "SMALL-FORWARD",
  "POWER-FORWARD",
  "CENTER"
]);

export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "AVAILABLE", // Jersey is available for borrowing
  "BORROWED", // Jersey is currently borrowed by a player
  "RETURNED", // Jersey has been returned by the player, but not yet processed
]);
export const StatusEnum = {
  AVAILABLE: "AVAILABLE",
  BORROWED: "BORROWED",
  RETURNED: "RETURNED",
} as const;
export type StatusEnum = keyof typeof StatusEnum;

export const COLOR_ENUM = pgEnum("color", [
  "RED",
  "ORANGE",
  "GOLD",
  "BLACK",
  "WHITE",
  "PRACTICE-RED",
  "GREEN",
  "ROYAL-BLUE",
  "LIGHT-BLUE",
  "PURPLE",
  "PINK",
  "PRACTICE-BLUE"
]);
export const SIZE_ENUM = pgEnum("size", ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"]);
export const SizeEnum = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  "2XL": "2XL",
  "3XL": "3XL",
  "4XL": "4XL"
} as const;
export type SizeEnum = keyof typeof SizeEnum;

export const SEASON_ENUM = pgEnum("season", ["WINTER", "SPRING", "SUMMER", "FALL"]);
export const SEASON_TYPE_ENUM = pgEnum("season_type", ["3x3", "5x5"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  image: text('image').notNull(),
  firstName: varchar("first_name", { length: 30 }).notNull(),
  lastName: varchar("last_name", { length: 30 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: text("password").notNull(),
  role: ROLE_ENUM("role").default("PLAYER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const players = pgTable("players", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  captain: boolean("captain").default(false).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const positions = pgTable("positions", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  position: POSITION_ENUM("position"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const playerPositions = pgTable("player_positions", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  playerId: uuid("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
  positionId: uuid("position_id").notNull().references(() => positions.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const teams = pgTable("teams", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  color: COLOR_ENUM("color").notNull(),
  name: varchar("name", { length: 30 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const playerTeams = pgTable("player_teams", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  playerId: uuid("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
  teamId: uuid("team_id").notNull().references(() => teams.id, { onDelete: "cascade" }),
})

export const jerseys = pgTable("jerseys", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  number: varchar("number", { length: 2 }).notNull(),
  color: COLOR_ENUM("color").notNull(),
  size: SIZE_ENUM("size").notNull(),
  description: text("description").notNull(),
  status: BORROW_STATUS_ENUM("status").default("AVAILABLE").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const playerJerseys = pgTable("player_jerseys", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  playerId: uuid("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
  jerseyId: uuid("jersey_id").notNull().references(() => jerseys.id, { onDelete: "cascade" }),
  borrowDate: date("borrow_date").defaultNow().notNull(),
  returnDate: date("return_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const borrowRecords = pgTable("borrow_records", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  playerId: uuid("player_id").references(() => players.id).notNull(),
  jerseyId: uuid("jersey_id").references(() => jerseys.id).notNull(),
  borrowDate: date("borrow_date").defaultNow().notNull(),
  dueDate: date("due_date"),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const seasons = pgTable("seasons", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  season: SEASON_ENUM("season").notNull(),
  seasonNumber: integer("season_number").notNull(),
  year: integer("year").notNull().default(sql`EXTRACT(YEAR FROM CURRENT_DATE)::integer`),
  type: SEASON_TYPE_ENUM("season_type").notNull(),
  startDate: date("season_start_date").defaultNow(),
  endDate: date("season_end_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const playerSeasons = pgTable("player_seasons", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  playerId: uuid("player_id").notNull().references(() => players.id, { onDelete: "cascade" }),
  seasonId: uuid("season_id").notNull().references(() => seasons.id, { onDelete: "cascade" }),
  paid: boolean("paid").default(false),
  signedConsent: boolean("signed_consent").default(false),
  participationStatus: boolean("participation_status").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});