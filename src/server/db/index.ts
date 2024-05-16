import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as workoutTables from "./workout";
import * as exerciseTables from "./exercise";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(env.POSTGRES_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

const schema = {
  ...workoutTables,
  ...exerciseTables,
};

export const db = drizzle(conn, { schema });
