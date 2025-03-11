import { setSessionTokenCookie } from "@/lib/cookies";
import { db } from "@/lib/db";
import { User, userTable } from "@/lib/db/schema";
import { discord } from "@/lib/oauth";
import { createSession, generateSessionToken } from "@/lib/session";
import { getUserFromDiscordId } from "@/lib/user";
import { OAuth2Tokens } from "arctic";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState =
    (await cookies()).get("discord_oauth_state")?.value ?? null;

  if (code === null || state === null || storedState === null) {
    return new Response("Redirecting...", { status: 400 });
  }

  if (state !== storedState) {
    return new Response("Redirecting...", { status: 400 });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await discord.validateAuthorizationCode(code, null);
  } catch (e) {
    // invalid code or credentials
    return new Response("Redirecting...", { status: 400 });
  }

  const discordUserResponse = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });

  const discordUser = await discordUserResponse.json();
  const discordUserId: string = discordUser.id;
  const discordUsername: string = discordUser.username; // will be display name if new account
  const discordAvatar: string = discordUser.avatar;
  const discordUserEmail: string | null = discordUser.verified
    ? discordUser.email
    : null; // only use verified emails

  const existingUser = await getUserFromDiscordId(discordUserId);

  if (existingUser !== null) {
    // TODO: update existing DB entry with fresh data (avatar, email?)
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    setSessionTokenCookie(sessionToken, session.expiresAt);

    return Response.redirect(new URL("/", request.url));
  }

  // create new user in the db

  // TODO: move this to a funciton in lib/user.ts
  const dbResult = await db
    .insert(userTable)
    .values({
      discordId: discordUserId,
      name: discordUsername,
      email: discordUserEmail ?? `temp-${discordUserId}@temp.com`, // FIXME:
      discordAvatar,
    })
    .returning();

  if (dbResult.length > 0) {
    const newUser = dbResult[0];

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, newUser.id);
    setSessionTokenCookie(sessionToken, session.expiresAt);

    return Response.redirect(new URL("/", request.url));
  }

  // if we havent returned yet, something went wrong?
  // TODO: should log something here

  return Response.redirect(new URL("/", request.url));
}
