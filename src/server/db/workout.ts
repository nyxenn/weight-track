import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

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
  exercises: many(workoutExercises),
  superset_exercises: many(exerciseSupersets),
}));

export const workoutExercises = createTable(
  "workout_exercises",
  {
    // TODO: Composite PK doesn't seem to work, fallback to just id
    id: serial("id").primaryKey(),
    workout_id: integer("workout_id")
      .notNull()
      .references(() => workouts.id),
    exercise_id: integer("exercise_id")
      .notNull()
      .references(() => exercises.id),
  },
  // TODO: Composite PK doesn't seem to work
  // (t) => ({ pk: primaryKey({ columns: [t.workout_id, t.exercise_id] }) }),
);

export const workoutExerciseRelations = relations(
  workoutExercises,
  ({ one }) => ({
    workout: one(workouts, {
      fields: [workoutExercises.workout_id],
      references: [workouts.id],
    }),
    exercise: one(exercises, {
      fields: [workoutExercises.exercise_id],
      references: [exercises.id],
    }),
  }),
);
