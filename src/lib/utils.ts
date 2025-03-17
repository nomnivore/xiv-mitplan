import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
export const slug = (len: number = 8) => customAlphabet(alphabet, len)();
