import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { boolean } from "drizzle-orm/gel-core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
export const slug = (len: number = 8) => customAlphabet(alphabet, len)();

// Error wrapping/handling
// Simple replacement for nesting try/catch blocks in app code
//
// Usage:
// const [result, err] = await tryCatch(somePromise);
// if (err) {
//   console.log(err.message);
//   return null;
// }
// doSomethingWith(result); // result is T
//
// or
//
// const [result, err] = tryCatchSync(() => someFunction());
// const [data, err] = tryCatchSync(JSON.parse, '{"name": "test"}');

export type Success<T> = [T, null];
export type Failure<E> = [null, E];
export type Result<T, E = Error> = Success<T> | Failure<E>;

export function isSuccess<T, E = Error>(result: Result<T, E>): result is Success<T> {
  return result[1] === null;
}

export function isFailure<T, E = Error>(result: Result<T, E>): result is Failure<E> {
  return result[1] !== null;
}

export function tryCatchSync<T, E = Error, A extends unknown[] = []>(
  fn: (...args: A) => T,
  ...args: A
): Result<T, E> {
  try {
    const data = fn(...args);
    return [data, null];
  } catch (error) {
    return [null, error as E];
  }
}
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as E];
  }
}

const [result, error]: Result<null> = tryCatchSync(() => null);