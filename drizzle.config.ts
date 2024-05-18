import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: [
    "./src/server/db/workout.ts",
    "./src/server/db/exercise.ts",
    "./src/server/db/workout-session.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["weight-track_*"],
} satisfies Config;
