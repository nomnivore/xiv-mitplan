import { env } from "@/env";
import { cookies } from "next/headers";

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies();

  cookieStore.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}
