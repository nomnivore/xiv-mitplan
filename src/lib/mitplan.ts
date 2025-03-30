"use server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { MitplanInsert, mitplanTable } from "./db/schema";
import { slug, tryCatch } from "./utils";

// this file contains useful server functions for interacting with mitplans and the database

/**
 * Tries to insert a mitplan with a unique slug
 * Slugs have a very low chance of collision
 * Returns the new mitplan if successful
 * @throws {Error} if the mitplan could not be inserted
 * @param mitplan The mitplan to insert
 * @param attempt The attempt number
 */
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

  const [result, err] = await tryCatch(
    db.insert(mitplanTable).values(mitplanWithId).returning(),
  );
  if (err) {
    if (
      err instanceof Error &&
      err.message.includes("UNIQUE constraint failed")
    ) {
      return tryInsertMitplanWithId(mitplan, attempt + 1);
    }
    throw err;
  }
  return result[0];
}

// creates a new mitplan
// returns the new mitplan's slug if successful
export async function createMitplan(data: {
  userId: number;
  name: string;
  description: string;
  fightId: string;
}) {
  const [result, err] = await tryCatch(tryInsertMitplanWithId(data));
  if (err) {
    console.log(err.message);
    return null;
  }
  return result.id;
}

/**
 * Returns all mitplans for a user
 * @param userId The id of the user to get mitplans for
 */
export async function getMitplansByUserId(userId: number) {
  return await db
    .select()
    .from(mitplanTable)
    .where(eq(mitplanTable.userId, userId));
}

/**
 * Returns a mitplan by id
 * Returns null if the mitplan does not exist
 * @param id The id of the mitplan to get
 */
export async function getMitplanById(id: string) {
  const result = await db
    .select()
    .from(mitplanTable)
    .where(eq(mitplanTable.id, id))
    .limit(1);
  return result[0] ?? null;
}

/**
 * Updates a mitplan by id
 * Returns the updated mitplan if successful
 * Returns null if the mitplan does not exist
 * @param id The id of the mitplan to update
 * @param data The data to update the mitplan with
 */
export async function updateMitplanById(id: string, data: Partial<MitplanInsert>) {
  const [result, err] = await tryCatch(
    db.update(mitplanTable).set(data).where(eq(mitplanTable.id, id)).returning()
  );
  if (err) {
    console.log(err.message);
    return null;
  }
  return result[0] ?? null;
}  