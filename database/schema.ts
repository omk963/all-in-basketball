import {
  text,
  boolean,
  pgTable,
  uuid,
  varchar,
  pgEnum,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["PLAYER", "ADMIN", "MODERATOR"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);
export const COLOR_ENUM = pgEnum("color",
  ["SILVER", "BLACK", "BLUE", "GREEN", "YELLOW", "PINK", "ORANGE"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  image: text('image').notNull(),
  firstName: varchar("first_name", { length: 30 }).notNull(),
  lastName: varchar("last_name", { length: 30 }).notNull(),
  email: varchar("email").notNull().unique(),
  password: text("password").notNull(),
  role: ROLE_ENUM("role").default("PLAYER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const jerseys = pgTable("jerseys", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  number: varchar("number", { length: 2 }).notNull(),
  color: COLOR_ENUM("color"),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})