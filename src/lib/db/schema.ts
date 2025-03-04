import { InferSelectModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),

  // in future, we can separate oauth providers to a separate database table/entry
  discordId: text("discord_id").notNull().unique(),
  // TODO: should be text or int?
});

export const sessionTable = sqliteTable("sessions", {
  id: text().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: int("expires_at", { mode: "timestamp" }).notNull(),
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
