import { eq } from "drizzle-orm";
import { db } from "./db";
import { User, userTable } from "./db/schema";

export async function getUserFromDiscordId(id: string): Promise<User | null> {
  const result = await db
    .select()
    .from(userTable)
    .where(eq(userTable.discordId, id))
    .limit(1);

  if (result.length === 0) return null;

  return result[0];
}
