"use server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { MitplanInsert, mitplanTable } from "./db/schema";
import { slug } from "./utils";

// tries to insert a mitplan with a unique slug
// slugs have a very low chance of collision
// returns the new mitplan if successful
async function tryInsertMitplanWithId(
  mitplan: Omit<MitplanInsert, "id">,
  attempt = 0,
) {
  if (attempt > 10) {
    // TODO: handle this better
    throw new Error("Failed to generate a unique slug");
  }

  const id = slug(8);
  const mitplanWithId = { ...mitplan, id };

  try {
    const result = await db
      .insert(mitplanTable)
      .values(mitplanWithId)
      .returning();
    return result[0];
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      return tryInsertMitplanWithId(mitplan, attempt + 1);
    }
    throw error;
  }
}

// creates a new mitplan
// returns the new mitplan's slug if successful
export async function createMitplan(data: {
  userId: number;
  name: string;
  description: string;
  fightId: string;
}) {
  try {
    return (await tryInsertMitplanWithId(data)).id;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return null;
    }
    throw error;
  }
}

// returns all mitplans for a user
export async function getMitplansByUserId(userId: number) {
  return await db
    .select()
    .from(mitplanTable)
    .where(eq(mitplanTable.userId, userId));
}

// returns a mitplan by id
export async function getMitplanById(id: string) {
  const result = await db
    .select()
    .from(mitplanTable)
    .where(eq(mitplanTable.id, id))
    .limit(1);
  return result[0] ?? null;
}
