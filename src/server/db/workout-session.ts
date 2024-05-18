import { relations, sql } from "drizzle-orm";
import {
  integer,
  numeric,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { createTable } from "./utils";
import { workouts } from "./workout";
import { exercises } from "./exercise";

export const workoutSessions = createTable("workout_session", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 128 }),
  workoutId: integer("workout_id"),
  date: timestamp("date", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const workoutSessionRelations = relations(
  workoutSessions,
  ({ one, many }) => ({
    workout: one(workouts, {
      fields: [workoutSessions.workoutId],
      references: [workouts.id],
    }),

    session_exercises: many(workoutSessionExercises),
  }),
);

export const workoutSessionExercises = createTable("workout_session_exercise", {
  id: serial("id").primaryKey(),
  workoutSessionId: integer("workout_session_id"),
  exerciseId: integer("exercise_id"),
  targetWeightKg: numeric("target_weight_kg", { precision: 10, scale: 4 }),
  set: integer("set"),
  reps: integer("reps"),
  weightKg: numeric("weight_kg", { precision: 10, scale: 4 }),
  date: timestamp("date", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const workoutSessionExerciseRelations = relations(
  workoutSessionExercises,
  ({ one }) => ({
    workoutSession: one(workoutSessions, {
      fields: [workoutSessionExercises.workoutSessionId],
      references: [workoutSessions.id],
    }),
    exercise: one(exercises, {
      fields: [workoutSessionExercises.exerciseId],
      references: [exercises.id],
    }),
  }),
);
