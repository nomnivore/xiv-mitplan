import { setSessionTokenCookie } from "@/lib/cookies";
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
    return new Response(null, { status: 400 });
  }

  if (state !== storedState) {
    return new Response(null, { status: 400 });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await discord.validateAuthorizationCode(code, null);
  } catch (e) {
    // invalid code or credentials
    return new Response(null, { status: 400 });
  }

  const discordUserResponse = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });

  const discordUser = await discordUserResponse.json();
  const discordUserId: string = discordUser.id;
  const discordUsername: string = discordUser.username; // will be display name if new account
  const discordUserEmail: string | null = discordUser.verified
    ? discordUser.email
    : null; // only use verified emails

  const existingUser = await getUserFromDiscordId(discordUserId);

  if (existingUser !== null) {
    // TODO: create lucia-style session and cookie api
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, discordUserId);
    setSessionTokenCookie(sessionToken, session.expiresAt);

    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }
}
