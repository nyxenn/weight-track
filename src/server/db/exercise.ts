import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  serial,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { createTable } from "./utils";
import { workoutExercises, workouts } from "./workout";

/*************
 * EXERCISES *
 *************/
export const exercises = createTable(
  "exercises",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 128 }),
    rep_range_id: integer("rep_range_id")
      .notNull()
      .references(() => repRanges.id),

    user_id: varchar("user_id", { length: 256 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (exercise) => ({
    nameIndex: index("name_idx").on(exercise.name),
  }),
);

export const exerciseRelations = relations(exercises, ({ one, many }) => ({
  rep_range: one(repRanges, {
    fields: [exercises.rep_range_id],
    references: [repRanges.id],
  }),
  workoutExercises: many(workoutExercises),
  exercise_b_supersets: many(exerciseSupersets, { relationName: "exercise_a" }),
  exercise_a_supersets: many(exerciseSupersets, { relationName: "exercise_b" }),
}));

/**************
 * REP RANGES *
 **************/
export const repRanges = createTable("rep_ranges", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }),
  min: smallint("min"),
  max: smallint("max"),
});

export const repRangeRelations = relations(repRanges, ({ many }) => ({
  exercises: many(exercises),
}));

/**************
 * SUPERSETS  *
 **************/
export const exerciseSupersets = createTable(
  "exercise_supersets",
  {
    // TODO: Composite PK doesn't seem to work, fallback to just id
    id: serial("id").primaryKey(),
    workout_id: integer("workout_id")
      .notNull()
      .references(() => workouts.id),
    exercise_a_id: integer("exercise_a_id")
      .notNull()
      .references(() => exercises.id),
    exercise_b_id: integer("exercise_b_id")
      .notNull()
      .references(() => exercises.id),
  },
  // TODO: Composite PK doesn't seem to work
  // (t) => ({
  //   pk: primaryKey({
  //     columns: [t.workout_id, t.exercise_a_id, t.exercise_b_id],
  //   }),
  // }),
);

export const exerciseSupersetRelations = relations(
  exerciseSupersets,
  ({ one }) => ({
    workout: one(workouts, {
      fields: [exerciseSupersets.workout_id],
      references: [workouts.id],
    }),
    exercise_a: one(exercises, {
      fields: [exerciseSupersets.exercise_a_id],
      references: [exercises.id],
      relationName: "exercise_a",
    }),
    exercise_b: one(exercises, {
      fields: [exerciseSupersets.exercise_b_id],
      references: [exercises.id],
      relationName: "exercise_b",
    }),
  }),
);
