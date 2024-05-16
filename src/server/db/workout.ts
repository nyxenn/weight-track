import { relations, sql } from "drizzle-orm";
import { serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { createTable } from "./utils";
import { exerciseSupersets, exercises } from "./exercise";

export const workouts = createTable("workouts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const workoutRelations = relations(workouts, ({ many }) => ({
  exercises: many(exercises, { relationName: "exercises" }),
  superset_exercises: many(exerciseSupersets, {
    relationName: "superset_exercises",
  }),
}));
