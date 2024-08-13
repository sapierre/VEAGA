import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

import { env } from "./src/env";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
