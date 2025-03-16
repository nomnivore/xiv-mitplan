import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { customType, int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const json = <TData>(name: string) =>
  customType<{ data: TData; driverData: string }>({
    dataType() {
      return "text";
    },
    toDriver(value: TData) {
      return JSON.stringify(value);
    },
    fromDriver(value: string) {
      return JSON.parse(value) as TData;
    },
  })(name);

export const userTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),

  // in future, we can separate oauth providers to a separate database table/entry
  discordId: text("discord_id").notNull().unique(),
  // TODO: should be text or int?

  discordAvatar: text("discord_avatar"), // hash of the user's avatar, if exists
});

export const sessionTable = sqliteTable("sessions", {
  id: text().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: int("expires_at", { mode: "timestamp" }).notNull(),
});

export const mitplanTable = sqliteTable("mitplans", {
  id: text().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => userTable.id),
  name: text("name").notNull(),
  description: text("description"), // plaintext for now, may be markdown later
  fightId: text("fight_id"), // shortcode like "fru" or "m4s" fight data stored elsewhere

  // this is probably horribly unoptimized, maybe fully normalized db tables is the way to go
  // but i want to keep it simple for the first iteration

  // roles are: name: code
  // name should be unique -- we can use a hash table to enforce this
  roles: json<Record<string, string>>("roles").notNull().default({}),
  mechanics: json<
    {
      name: string;
      mits: {
        role: string;
        actions: string[];
      }[];
    }[]
  >("mechanics").notNull().default([]), // TODO: better types

  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date(Date.now())),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date(Date.now())),
});

export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
export type Mitplan = InferSelectModel<typeof mitplanTable>;
export type MitplanInsert = InferInsertModel<typeof mitplanTable>;
