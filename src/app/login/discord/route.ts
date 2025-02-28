import { env } from "@/env";
import { discord } from "@/lib/oauth";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  const state = generateState();
  const scopes = ["identify", "email"];
  const url = discord.createAuthorizationURL(state, null, scopes);

  (await cookies()).set("discord_oauth_state", state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}
