import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).optional(),

    DISCORD_CLIENT_ID: z.string().min(1),
    DISCORD_CLIENT_SECRET: z.string().min(1),

    TURSO_DATABASE_URL: z.string().url(),
    TURSO_AUTH_TOKEN: z.string().min(1),
  },

  // all client env vars must start with this
  clientPrefix: "PUBLIC_",
  client: {},

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});
