import { Discord } from "arctic";

import { env } from "@/env";

export const discord = new Discord(
  env.DISCORD_CLIENT_ID,
  env.DISCORD_CLIENT_SECRET,
  "http://127.0.0.1:3000/auth/discord/callback",
);
